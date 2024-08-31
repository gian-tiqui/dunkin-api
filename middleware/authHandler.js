import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const authHandler = async (req, res, next) => {
  const token = req.header("x-access-token");

  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied: no token provided" });
  }

  try {
    const tokenDetails = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = tokenDetails;
    next();
  } catch (error) {
    res.status(403).json({ message: "Access denied: Invalid token" });
  }
};

export default authHandler;
