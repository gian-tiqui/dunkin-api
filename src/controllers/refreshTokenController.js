import UserToken from "../models/userToken.js";
import jwt from "jsonwebtoken";
import verifyRefreshToken from "../utils/verifyRefreshToken.js";
import { config } from "dotenv";
import { refreshTokenBodyValidation } from "../utils/validationSchema.js";

config();

export const refresh = async (req, res) => {
  const { error } = refreshTokenBodyValidation(req.body);
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  if (error) {
    return res.status(401).json({ message: error.details[0].message });
  }

  verifyRefreshToken(req.body.refreshToken)
    .then(({ tokenDetails }) => {
      const payload = { _id: tokenDetails._id, role: tokenDetails.role };

      const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: "14m",
      });

      res.status(200).json({
        accessToken,
        message: "Access token generated",
      });
    })
    .catch((err) => res.status(400).json({ message: err.message }));
};

export const deleteRefreshToken = async (req, res) => {
  try {
    const { error } = refreshTokenBodyValidation(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const userToken = await UserToken.findOne({ token: req.body.refreshToken });

    if (!userToken) {
      return res.status(200).json({ message: "smth went wrong" });
    }

    await UserToken.deleteOne();

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
