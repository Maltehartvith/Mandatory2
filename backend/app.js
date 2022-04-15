import express from "express";
import helmet from "helmet"
import path from "path";
import beersRouter from "./router/beersRouter.js";
import userRouter from "./router/userRouter.js";
import session from "express-session"

const app = express();

app.use(express.json());


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


app.get('*', (req, res) => res.sendFile(path.resolve('../svelte-frontend/public/index.html')));




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("The app is running on port: ", PORT);
});

