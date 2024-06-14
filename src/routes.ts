import cors from 'cors';
import { Router } from "express";
import CarController from "./controllers/CarController";
import UserController from "./controllers/UserController";


const routes = Router();
routes.use(cors());

//users routes
routes.get("/users", UserController.find);

routes.delete("/user/:id", UserController.delete);
routes.post("/user", UserController.create);
routes.post("/login", UserController.login);


//cars routes
routes.delete("/car/:id", CarController.delete);
routes.get("/cars", CarController.find);
routes.post("/car", CarController.create);
routes.put("/car/:id", CarController.update);

export default routes;






