import mongoose from "mongoose";

const funcionario = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    cargo: {
        type: String,
        required: true
    },
    salario: {
        type: Number,
        required: true
    },
    dataAdmissao: {
        type: Date,
        required: true,
        default: Date.now
    }
});



export default mongoose.model("Funcionario", funcionario);