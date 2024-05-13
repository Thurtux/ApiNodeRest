import express from "express";
import mongoose from "mongoose";

const app = express();
mongoose.connect(`mongodb://localhost/ApiNodeTcc`)

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Ola");
})

app.listen(3000, () => {
    console.log("Sever is listening")
});