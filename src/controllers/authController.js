import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import {
  loginBodyValidation,
  signUpBodyValidation,
} from "../utils/validationSchema.js";
import generateTokens from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { error } = signUpBodyValidation(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({ message: "User already registered" });
    }

    const salt = process.env.SALT;
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    await new User({ ...req.body, password: hashPassword }).save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { error } = loginBodyValidation(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const vertifiedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!vertifiedPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = await generateTokens(user);

    return res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
