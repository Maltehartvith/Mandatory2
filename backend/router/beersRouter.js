import { Router } from "express";
const router = Router();
import db from "../database/createConnection.js"

//Get method to get all the beers
router.get("/api/beers", async (req, res) => {
    const beers = await db.all("SELECT * FROM beers;");

    res.send({ data: beers });
});

//Get method to select a single beer
router.get("/api/beers/:name", async (req, res) => {
    const name = req.params.name;

    const singleBeer = await db.get(`SELECT * FROM beers WHERE name = ?`, [name])

    res.send({ data: singleBeer })
});

//Post method to create a new beer
router.post("/api/beers", async (req, res) => {
    
    const { name, price, description, imgPath } = req.body;

    const { changes } = await db.run(`INSERT INTO players (name, price, description, imgPath) 
    VALUES ('?', ?, '?');`, [name, price, description, imgPath]);

    res.send({ rowsAffected: changes });
});

export default router;