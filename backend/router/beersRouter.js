import { Router } from "express";
const router = Router();
import db from "../database/createConnection.js"




router.get("/api/beers", async (req, res) => {
    const beers = await db.all("SELECT * FROM beers;");
    res.send({ data: beers });
});

router.get("/api/beers/:name", async (req, res) => {
    const name = req.params.name;
    
    const singleBeer = await db.get(`SELECT * FROM beers WHERE name = ?`, [name])
    
    res.send({data: singleBeer})
});

router.post("/api/beers", async (req, res) => {
    const { name, price, description, imgPath } = req.body;
    const { changes } = await db.run(`INSERT INTO players (name, price, description, imgPath) 
    VALUES ('?', ?, '?');`, [name, price, description, imgPath]);
    res.send({ rowsAffected: changes });
});

export default router;