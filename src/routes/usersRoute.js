import { Router } from "express";
import authHandler from "../../middleware/authHandler.js";
import roleCheck from "../../middleware/roleCheck.js";
import { checkUserRole } from "../controllers/usersController.js";

const userRouter = Router();

userRouter.get("/details", authHandler, roleCheck(["admin"]), checkUserRole);

export default userRouter;
