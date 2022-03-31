import express from "express";


const app = express();

app.use(express.json());

app.use(express.static("../svelte-frontend/public"))


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("The app is running on port: ", PORT)
})

