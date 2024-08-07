import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const validator = async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    try {
      const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded.user;
      next();
    } catch (err) {
      res.status(401);
      throw new Error("User is not authorized");
    }
  } else {
    res.status(401).json({ message: "User is not authorized, header missing" });
  }
};

const validateToken = asyncHandler(validator);

export default validateToken;
