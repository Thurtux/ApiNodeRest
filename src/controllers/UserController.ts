import { Request, Response } from "express";
import User from "../database/Schemas/User";

class UseController {

    async find(request: Request, response:Response) {
    try {
        const users = await User.find();
        return response.json(users);
    }
    
    catch (error) {
        return response.status(500).send({
            error: "search not performed",
            message: error
        })
     }

    }

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


    async delete(request: Request, response: Response) {
        const { id, email } = request.body;
        try {
            const user = await User.findOne(email);
            if (user!) {
                return response.status(400).json({
                    error: "User does not exist"
                });
            }
            else {
            await User.deleteOne({ id }); 
    
            return response.json({
                message: "User deleted successfully"
            });
        }
        } catch (error) {
            return response.status(500).json({
                error: "Deletion error",
                message: error
            });
        }
    }
    
    
}


export default new UseController();