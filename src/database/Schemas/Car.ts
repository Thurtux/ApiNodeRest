import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import { SignatureKind } from "typescript";

const Car = new mongoose.Schema({
    mark: {
        type: String,
        require: true
    },
    model: {
        type: String,
        require: true
    },
    plate: {
        type: String,
        require: true
    },
    releaseDate: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        require: true,

    },
    color: {
        type: String,
        require: true,
    },
    quilometragem: {
        type: String,
        require: true
    },
    cambio: {
        type: String,
        require: true
    },
    motor: {
        type: String,
        require: true
    },
    flex: {
        type: Boolean,
        require: true
    },
    description: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    }
});





export default mongoose.model("Car", Car);