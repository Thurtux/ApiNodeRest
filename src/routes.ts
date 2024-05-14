import { Router } from "express";
import UserController from "./controllers/UserController"

const routes = Router();

routes.post("/users", UserController.find)
routes.post("/user", UserController.create);

export default routes;