import cors from 'cors';
import { Router } from "express";
import CarController from "./controllers/CarController";
import FuncionarioController from './controllers/FuncionarioController';
import UserController from "./controllers/UserController";


const routes = Router();
routes.use(cors());

//users routes
routes.get("/users", UserController.find);
routes.delete("/user/:id", UserController.delete);
routes.post("/user", UserController.create);
routes.put("/user/:id", UserController.update);
routes.post("/login", UserController.login);


//cars routes
routes.delete("/car/:id", CarController.delete);
routes.get("/cars", CarController.find);
routes.post("/car", CarController.create);
routes.put("/car/:id", CarController.update);


//funcionario routes
routes.post("/func", FuncionarioController.create);
routes.get("/funcs", FuncionarioController.find);
routes.delete("/func", FuncionarioController.delete);
routes.put("/func/:id", FuncionarioController.update);

export default routes;






