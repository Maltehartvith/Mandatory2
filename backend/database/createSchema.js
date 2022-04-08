import db from "./createConnection.js"

const isInDeleteMode = true;

if (isInDeleteMode){
    db.exec(`DROP TABLE IF EXISTS beers;`);
}

db.exec(`
    CREATE TABLE IF NOT EXISTS beers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(70),
    price INT,
    description VARCHAR(255),
    imgpath VARCHAR(100)
    );`
);

//For seeding (creating dummy data)
if (isInDeleteMode){
    db.run("INSERT INTO beers (name, price, description, imgpath) VALUES ('Big Doink', 50, 'Denne øl har en lækker hazy og sæbet smag, som ligger dejlig rundt i munden','./big-doink.webp');")
    db.run("INSERT INTO beers (name, price, description, imgpath) VALUES ('Pilser 2', 5, 'En klassisk pilser', './bottles.jpg');")
}

db.close();