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
    db.run("INSERT INTO beers (name, price, description, imgpath) VALUES ('Big Doink', 50, 'Denne øl har en lækker hazy og sæbet smag, som ligger dejlig rundt i munden','./images/big-doink.png');")
    db.run("INSERT INTO beers (name, price, description, imgpath) VALUES ('Pilser 2', 5, 'En klassisk pilser', './images/bottles.jpg');");
    db.run("INSERT INTO beers (name, price, description, imgpath) VALUES ('IPA', 18, 'En frugtig øl med massere af smag', './images/ipa.png');");
    db.run("INSERT INTO beers (name, price, description, imgpath) VALUES ('Tuborg', 3.5, 'En klassisk pilser', './images/tuborg.png');");
    db.run("INSERT INTO beers (name, price, description, imgpath) VALUES ('Carlsberg', 4, 'En kedelig klassisk pilser', './images/carlsberg.webp');");
    db.run("INSERT INTO beers (name, price, description, imgpath) VALUES ('Fynsk forår', 12.5, 'Har en let smag af hyldeblomst og forår', './images/fynskforaar.png');");
    db.run("INSERT INTO beers (name, price, description, imgpath) VALUES ('Årgangsøl', 16.75, 'Kan godt gå hen og blive lidt for sur', './images/bottles.jpg');");

}

db.close();