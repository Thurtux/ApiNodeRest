import { Request, Response } from "express";
import Car from "../database/Schemas/Car";

class CarController {

    async find(request: Request, response:Response) {
    try {
        const cars = await Car.find();
        return response.json(cars);
    }
    
    catch (error) {
        return response.status(500).send({
            error: "search not performed",
            message: error
        })
     }
    }



    async create(request: Request, response:Response) {
            const {mark, model, plate, releaseDate, price, color, description, image} = request.body;
        try {
            const CarsExist = await Car.findOne({ plate });

            if(CarsExist) {
                return response.status(400).json({
                    error: "oops",
                    message: "Cars already exist",
                });
            }

            const user = await Car.create({
                mark,
                model,
                plate,
                releaseDate,
                price,
                color,
                description,
                image
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
        const { id } = request.body;
        try {
            const cars = await Car.findById(id);
            if (!cars) {
                return response.status(400).json({
                    error: "Car does not exist"
                });
            }
    
            await Car.deleteOne({ id }); 
    
            return response.json({
                message: "Car deleted successfully"
            });
        } catch (error) {
            return response.status(500).json({
                error: "Deletion error",
                message: error
            });
        }
    }


    async update(request: Request, response: Response) {
        const { id, mark, model, plate, releaseDate, price, color, description, image} = request.body;
        try {
            const cars = await Car.findById(id);
            if (cars!) {
                return response.status(400).json({
                    error: "Car does not exist"
                });
            }
    
            await Car.updateMany({mark, model, plate, releaseDate, price, color, description, image}); 
    
            return response.json({
                message: "Car update successfully"
            });
        } catch (error) {
            return response.status(500).json({
                error: "update error",
                message: error
            });
        }
    }
    
    
}


export default new CarController();