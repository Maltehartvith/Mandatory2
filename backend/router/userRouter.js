import { Router } from "express";

import db from "../database/createConnection.js"
import bcrypt from "bcrypt"

const saltRounds = 12;

const router = Router();

//Simple overview over users.
router.get("/api/users", async (req, res) => {
    const users = await db.all(`SELECT * FROM users`);
    res.send( { data: users } );
});

//Logs you in via session
router.post("/api/login", async (req, res) => {
    const { username, password } = req.body;


    const foundUser = await db.get(`SELECT * FROM users WHERE username = ?;`, [username]);

    if(!foundUser) {
        return res.status(404).send("User not found. Be sure to type the corret password and username");
    }
    
    const isSame = await bcrypt.compare(password, foundUser.password);
   
    if(isSame && !req.session.loggedIn) {
        
        req.session.loggedIn = true;
        req.session.username = username;
        return res.send("You have been logged in!");
    }
    
    if(req.session.loggedIn) {
        res.send("You are already logged in!");
    }
    
})


//End session of login
router.get("/api/logout", (req, res) => {

    if(req.session.loggedIn) {

        req.session.loggedIn = false;
        const username = req.session.username;
        return res.send("You have been logged out");

    } 
    res.send("You are not logged in")
});


//Create a user through the website
router.post("/api/signup", async (req, res) => {

    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const { changes } = await db.run(`INSERT INTO users (username, password, email) VALUES (?, ?, ?)`, [username, hashedPassword, email]);

    if(changes === 1) {
        return res.send("You have been signed up");
    }

    res.send("Sign up failed")
});

//Create a user via hardcoding
router.post("/api/users", async (req, res) => {
    const { username, password, email, isAdmin } = req.body;
    const create = await db.run(`INSERT INTO users (username, password, email, isadmin) 
    VALUES (?, ?, ?)`, [username, password, email, isAdmin])
    res.send({ rowsAffected: create})
})

router.delete("/api/users/:id", async (req, res) => {
    const idToDelete = req.params.id;
    const deleted = await db.run(`DELETE FROM users WHERE id = ?`, idToDelete)
    res.send({ rowsAffected: deleted})
})


export default router;