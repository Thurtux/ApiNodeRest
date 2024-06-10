import { Request, Response } from "express";
import User from "../database/Schemas/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class UserController {
    async find(request: Request, response: Response) {
        try {
            const users = await User.find();
            return response.json(users);
        } catch (error: any) {
            return response.status(500).send({
                error: "search not performed",
                message: error.message // Use error.message para mostrar a mensagem de erro
            });
        }
    }

    async create(request: Request, response: Response) {
        const { name, email, password } = request.body;

        try {
            const userExists = await User.findOne({ email });

            if (userExists) {
                return response.status(400).json({
                    error: "oops",
                    message: "user already exist",
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10); // Hash da senha

            const user = await User.create({
                name,
                email,
                password: hashedPassword, // Salvar a senha hashada
            });

            return response.json(user);

        } catch (error: any) {
            return response.status(500).send({
                error: "Nao foi possivel criar usuario",
                message: error.message // Use error.message para mostrar a mensagem de erro
            });
        }
    }

    async delete(request: Request, response: Response) {
        const { id, email } = request.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return response.status(400).json({
                    error: "User does not exist"
                });
            } else {
                await User.deleteOne({ id });

                return response.json({
                    message: "User deleted successfully"
                });
            }
        } catch (error: any) {
            return response.status(500).json({
                error: "Deletion error",
                message: error.message // Use error.message para mostrar a mensagem de erro
            });
        }
    }

    async login(request: Request, response: Response) {
        const { email, password } = request.body;

        try {
            const user = await User.findOne({ email });

            if (!user) {
                return response.status(400).json({
                    error: "oops",
                    message: "User does not exist",
                });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return response.status(400).json({
                    error: "oops",
                    message: "Incorrect password",
                });
            }

            // Generate a JWT token
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });

            console.log("User password:", user.password);
            console.log("Input password:", password);

            return response.json({
                message: "Login successful",
                token,
            });

        } catch (error: any) {
            console.error("Login error:", error);  // Adicione este log para depuração
            return response.status(500).json({
                error: "Nao foi possivel fazer login",
                message: error.message // Use error.message para mostrar a mensagem de erro
            });
        }
    }
}


export default new UserController();