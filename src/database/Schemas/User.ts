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