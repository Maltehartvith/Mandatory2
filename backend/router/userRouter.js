import { Router } from "express";
import db from "../database/createConnection.js"
import bcrypt from "bcrypt"
import nodemailer from "nodemailer";

//Salt rounds are for the bcrypt
const saltRounds = 12; 
const router = Router();

//Simple overview over users. I have commented it out, because it can be usefull in development, 
//but otherwise people shouldn't have access to the api/users to see all users and passwords
router.get("/api/users", async (req, res) => {
    const users = await db.all(`SELECT * FROM users`);
    res.send( { data: users } );
});

//Logs you in via session
router.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    
    //finds the user (Collate NOCASE makes sure that it doesnt matter if i write Malte or MaLtE. (it is not case sensitive(is this now inception?)))
    const foundUser = await db.get(`SELECT * FROM users WHERE username = ? COLLATE NOCASE;`, [username]);

    //response message in case something goes wrong or user doesn't exist
    if(!foundUser) {
        return res.status(404).send("User not found. Be sure to type the corret password and username.");
    }
    if(password == null){
        return res.status(404).send("You also have to use a password... Be sure to type the corret password and username.");

    }
    
    //compares the password that is written and the password that is found on the user from db
    const isSame = await bcrypt.compare(password, foundUser.password);
    console.log(username)
    //logs you in, if you are not already logged in.
    if(isSame && !req.session.loggedIn) {
        req.session.loggedIn = true;
        req.session.username = username;
        return res.send("You have been logged in!");
    }
    
    if(req.session.loggedIn) {
        return res.send("You are already logged in!");
    }  
})

//End session of login (logout)
router.get("/api/logout", (req, res) => {

    if(req.session.loggedIn) {

        req.session.loggedIn = false;
        const username = req.session.username;
        return res.send("You have been logged out");

    } 
    res.send("You are not logged in")
});


//Create a user through the website on the signup page
router.post("/api/signup", async (req, res) => {
    
    let { username, password, email } = req.body;
    //checks if there's a user with the username or password that a new user is trying to use.
    const foundUser = await db.get("SELECT * FROM users WHERE username = ? COLLATE NOCASE", [username])
    const foundEmail = await db.get("SELECT * FROM users WHERE email = ? COLLATE NOCASE", [email])

    if( foundUser ) {
        return res.status(404).send("There is already a user with that Username")
    }
    if( foundEmail ) {
            return res.status(404).send("There is already a user with that email")
    }  
    
    
    const hashedPass = await bcrypt.hash(password, saltRounds);

    //creates the new user and sends a mail
    const { changes } = await db.run(`INSERT INTO users (username, password, email) VALUES (?, ?, ?)`, [username, hashedPass, email]);

    if(changes === 1) {
        sendMail(email);
        return res.send("You have been signed up");
    }

    res.send("Sign up failed")
});

//Delete method to remove a user... if they have been naughty naughty
router.delete("/api/users/:id", async (req, res) => {
    const idToDelete = req.params.id;
    const deleted = await db.run(`DELETE FROM users WHERE id = ?`, idToDelete)
    res.send({ rowsAffected: deleted})
})

//send a mail function. IT IS IMPORTANT TO CREATE A .ENV FILE FOR THIS TO WORK
function sendMail(email) {
    //setup which type mail you are going to use with the username and password.
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD
        }
    });
      
    // The template for the mail which is going to be sent. This is just a standard for when you signup.
    let mailDetails = {
        from: 'StaticBeers@gmail.com',
        to: email,
        subject: 'Static Beers bid you welcome',
        html:'<p> Thank you for signing up to Static Beers! <br> Get to our shopping site now - You do have to log in!: <a href="http://localhost:3000/"> Click here </a> </p>'
    };
      
    //sends the mail and sends a error to console if it doesnt work.
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
        }
    });
}

export default router;