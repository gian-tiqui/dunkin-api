import express from "express";
import {
  registerUser,
  login,
  getUsers,
  currentUser,
} from "../controllers/userController.js";
import validateToken from "../../middleware/validateTokenHandler.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.get("/api/v1/users", getUsers);
router.get("/current", validateToken, currentUser);

export default router;
