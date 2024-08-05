import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import asyncHandler from "express-async-handler";

config();

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json("Fields are required");
    }

    const user = await User.findOne({ email });
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const tokenExpiration = 12 * 60 * 60;
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },
      secret,
      { expiresIn: tokenExpiration }
    );

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        accessToken,
      });
    } else {
      res.status(401).json({ message: "ehe" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    console.log("Checking if user exists");
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
