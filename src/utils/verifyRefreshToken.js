import jwt from "jsonwebtoken";
import UserToken from "../models/userToken.js";

const verifyRefreshToken = async (refreshToken) => {
  const pKey = process.env.REFRESH_TOKEN_SECRET;

  try {
    const token = await UserToken.findOne({ token: refreshToken });

    if (!token) {
      throw new Error("Invalid refresh token");
    }

    const tokenDetails = jwt.verify(refreshToken, pKey);

    return {
      tokenDetails,
      message: "Valid refresh token",
    };
  } catch (err) {
    throw {
      error: err,
      message: "Invalid refresh token",
    };
  }
};

export default verifyRefreshToken;
