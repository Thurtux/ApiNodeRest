import express from "express";
import mongoose from "mongoose";
import routes from "./routes";
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
mongoose.connect(`mongodb://localhost/ApiNodeTcc`)

app.use(cors())

app.use(express.json());

app.use(express.json());
app.use(routes);

app.listen(4000, () => {
    console.log("Sever is listening")
});