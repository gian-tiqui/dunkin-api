import express from "express";
import {
  registerUser,
  login,
  getUsers,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.get("/api/v1/users", getUsers);

export default router;
