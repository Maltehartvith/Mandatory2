import db from "./createConnection.js";
import 'dotenv/config';

const isInDeleteMode = true;

if (isInDeleteMode){
    db.exec(`DROP TABLE IF EXISTS beers;`);
    db.exec(`DROP TABLE IF EXISTS users;`);
}

//creates the table for beers
db.exec(`
    CREATE TABLE IF NOT EXISTS beers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(70),
    price INT,
    description VARCHAR(255),
    imgpath VARCHAR(100)
    );`
);

//creates the table for users
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(70),
    password VARCHAR(32),
    email VARCHAR(100)
    );`
);

//For seeding (creating dummy data)
if (isInDeleteMode){
    db.run("INSERT INTO beers (name, price, description, imgpath) VALUES ('Big Doink', 50, 'DOUBLE IPA - 8.0% ABV \nHopped with Cashmere, Columbus, Citra & Mosaic','./images/big-doink.png');")
    db.run("INSERT INTO beers (name, price, description, imgpath) VALUES ('Pilser', 5, 'A classic danish pilsner. Not the best and.. maybe not the worst. Try it yourself!', './images/pilsner.png');");
    db.run("INSERT INTO beers (name, price, description, imgpath) VALUES ('IPA', 18, 'A fruity beer with a lot of taste! Try this smoothness with some salty and crisp chips.', './images/ipa.png');");
    db.run("INSERT INTO beers (name, price, description, imgpath) VALUES ('Tuborg', 3.5, 'Another classic pilsner from Denmark. This may be a bit better thant the other pilsners we got here', './images/tuborg.png');");
    db.run("INSERT INTO beers (name, price, description, imgpath) VALUES ('Carlsberg', 4, 'Well.. What can i say? It is a.. somewhat pilsner', './images/carlsberg.png');");
    db.run("INSERT INTO beers (name, price, description, imgpath) VALUES ('Fynsk forår', 12.5, 'This beer have a light taste of elderflower and spring! Coming to you.. NOW!', './images/fynskforaar.png');");
    db.run("INSERT INTO beers (name, price, description, imgpath) VALUES ('Årgangsøl', 16.75, 'A beer for each year! Now you can supply your alcholism with fresh colors, that change each year!', './images/aargangsoel.png');");
    db.run("INSERT INTO beers (name, price, description, imgpath) VALUES ('Corona', 12.75, 'This is a fine beer, if you look away from the name. It tastes better than the virus, especially if you add a slice of lemon.', './images/corona.png');");
}



db.close();