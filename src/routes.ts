import { Router } from "express";
import UserController from "./controllers/UserController"
import CarController from "./controllers/CarController";
import router from "./auth/UserRegister";

const routes = Router();

//users routes
routes.delete("/user", UserController.delete);
routes.get("/users", UserController.find);
routes.post("/user", UserController.create);



//cars routes
routes.delete("/car", CarController.delete);
routes.get("/cars", CarController.find);
routes.post("/car", CarController.create);
routes.put("/car", CarController.update)
export default routes;


routes.use('/api/auth', router);




