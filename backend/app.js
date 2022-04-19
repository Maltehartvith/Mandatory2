import express from "express"; //so we can use express for our backend
import cors from "cors"; 
import 'dotenv/config'; //important import, otherwise you cant use .env
import path from "path"; //helps us with working with filepaths and such
import helmet from "helmet"; //middleware to secure our express app by setting various HTTP headers.
import session from "express-session"; //creates a session which gives us an oppotunity to create login session
//import router
import beersRouter from "./router/beersRouter.js";
import userRouter from "./router/userRouter.js";


const app = express(); //instanciate express so we can use it
app.use(cors()); // run frontend and backend on same localhost
app.use(express.json()); //helps our fetch methods.
//gives express access to our frontend
app.use(express.static(path.resolve("../svelte-frontend/public")));

app.use("/api", helmet());

app.use(session ( {
    secret: "They will never know",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}
));

app.use(beersRouter);
app.use(userRouter);

//setup so all pages can be accessed through our pagelinks, even though we are running a singlepage.
app.get('*', (req, res) => res.sendFile(path.resolve('../svelte-frontend/public/index.html')));

//set up for the port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("The app is running on port: ", PORT);
});