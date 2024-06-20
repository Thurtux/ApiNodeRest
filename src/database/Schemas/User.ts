import bcrypt from 'bcryptjs';
import mongoose from "mongoose";

const User = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
        //lowerCase: tipo conversao minuscula
    },
    password: {
        type: String,
        required: true,
        select: true,
    },
    cpf: {
        type: String,
        require: true,
        unique: true
    },
    logradouro: {
        type: String,
        require: true
    },
    bairro: {
        type: String,
        require: true
    },
    localidade: {
        type: String,
        require: true
    },
    uf: {
        type: String,
        require: true
    },
    cep: {
        type: String,
        require: true
    },
    telefone: {
        type: String,
        require: true
    },
    data_nascimento: {
        type: Date,
        require: true
    },
    num: {
        type: String,
        require: true
    },
    access_token: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});



User.pre('save', async function(next){
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;

    next();
})

export default mongoose.model("User", User);