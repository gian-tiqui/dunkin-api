import { Router } from "express";
import {
  refresh,
  deleteRefreshToken,
} from "../controllers/refreshTokenController.js";

const refreshTokenRouter = Router();

refreshTokenRouter.post("/refresh", refresh);
refreshTokenRouter.delete("/logout", deleteRefreshToken);

export default refreshTokenRouter;
