import { Request, Response } from "express";
import User from "../database/Schemas/User";

class UseController {
    async create(request: Request, response:Response) {
            const {name, email, password} = request.body;
        try {
            const userExists = await User.findOne({ email });

            if(userExists) {
                return response.status(400).json({
                    error: "oops",
                    message: "user already exist",
                });
            }

            const user = await User.create({
                name,
                email,
                password
            });
            return response.json(user);

    
        }
         catch (error) {
            return response.status(500).send({
                error: "Registration failed",
                message: error
            })
         }
    }
}



export default new UseController();