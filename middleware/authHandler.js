import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const authHandler = async (req, res, next) => {
  const token = req.header("x-access-token");
  if (!token)
    return res
      .status(403)
      .json({ error: true, message: "Access Denied: No token provided" });

  try {
    const tokenDetails = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = tokenDetails;

    next();
  } catch (err) {
    console.log(err);
    res
      .status(403)
      .json({ error: true, message: "Access Denied: Invalid token" });
  }
};

export default authHandler;
