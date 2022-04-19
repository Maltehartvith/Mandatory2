import sqlite3 from "sqlite3";
import { open } from "sqlite";

//constructs the database with sqlite3
const db = await open({
    filename: 'beers.db',
    driver: sqlite3.Database
})

export default db;