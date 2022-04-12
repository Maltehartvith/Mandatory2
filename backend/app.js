import express from "express";
import helmet from "helmet"

const app = express();

app.use(express.json());

import path from "path";
app.use(express.static(path.resolve("../svelte-frontend/public")));
//app.use(express.static("../svelte-frontend/public"))
app.use("/api", helmet());

import beersRouter from "./router/beersRouter.js";
app.use(beersRouter);

app.get('*', (req, res) => res.sendFile(path.resolve('../svelte-frontend/public/index.html')));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("The app is running on port: ", PORT);
});

