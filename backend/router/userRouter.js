import { Router } from "express";
const router = Router();
import db from "../database/createConnection.js"


router.get("/api/users", async (req, res) => {
    const users = await db.all("SELECT * FROM users;");
    res.send({ data: users });
})

router.post("/api/users", async (req, res) => {
    const { username, password, isAdmin } = req.body;
    const create = await db.run(`INSERT INTO users (username, password, isadmin) 
    VALUES (?, ?, ?)`, [username, password, isAdmin])
    res.send({ rowsAffected: create})
})

export default router;