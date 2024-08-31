import { Router } from "express";
import { config } from "dotenv";
import { login, register } from "../controllers/authController.js";

config();

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);

export default authRouter;
