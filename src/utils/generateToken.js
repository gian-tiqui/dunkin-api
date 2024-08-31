import jwt from "jsonwebtoken";
import UserToken from "../models/userToken.js";
import { config } from "dotenv";

config();

const generateTokens = async (user) => {
  try {
    const payload = { _id: user._id, role: user.role };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "14m",
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "30d",
    });

    const userToken = await UserToken.findOne({ userId: user._id });

    if (userToken) await userToken.deleteOne();

    await new UserToken({ userId: user._id, token: refreshToken }).save();

    return Promise.resolve({ accessToken, refreshToken });
  } catch (error) {
    return Promise.reject(error);
  }
};

export default generateTokens;
