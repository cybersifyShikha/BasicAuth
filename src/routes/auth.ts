import { Router } from "express";
import AuthController from "../controllers/Auth/auth.controller";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();
//Login route 
  router.post("/register", AuthController.register);
  router.post("/login", AuthController.login);

// //Change my password
// router.post("/change-password", [checkJwt], AuthController.changePassword);

export default router;