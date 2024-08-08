import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import asyncHandler from "express-async-handler";
import RefreshToken from "../models/refreshTokenModel.js";

config();

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json("Fields are required");

    const user = await User.findOne({ email });
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    const ACCESS_TOKEN_EXPIRATION = 12 * 60 * 60; // 12hours
    const REFRESH_TOKEN_EXPIRATION = 30 * 24 * 60 * 60; // 30days
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },
      accessTokenSecret,
      { expiresIn: ACCESS_TOKEN_EXPIRATION }
    );

    const refreshToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },
      refreshTokenSecret,
      { expiresIn: REFRESH_TOKEN_EXPIRATION }
    );

    if (user && (await bcrypt.compare(password, user.password))) {
      const newRefreshToken = new RefreshToken({
        token: refreshToken,
        user: user._id,
      });

      await newRefreshToken.save();

      res.status(200).json({
        status: "ok",
        data: {
          accessToken,
        },
      });
    } else {
      res
        .status(401)
        .json({ status: "not ok", data: { message: "Invalid Credentials" } });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    const foundUser = await User.findOne({ email });

    if (foundUser) {
      return res
        .status(401)
        .json({ message: `User with email already exists` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      phone,
      password: hashedPassword,
      role: "user",
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const currentUser = asyncHandler(async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
