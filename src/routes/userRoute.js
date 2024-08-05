import express from "express";
import {
  registerUser,
  login,
  getUsers,
  currentUser,
} from "../controllers/userController.js";
import validateToken from "../../middleware/validateTokenHandler.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", login);
userRouter.get("/api/v1/users", getUsers);
userRouter.get("/current", validateToken, currentUser);

export default userRouter;
