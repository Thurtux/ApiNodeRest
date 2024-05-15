import { Router } from "express";
import UserController from "./controllers/UserController"

const routes = Router();

routes.delete("/user", UserController.delete);
routes.get("/users", UserController.find);
routes.post("/user", UserController.create);

export default routes;
