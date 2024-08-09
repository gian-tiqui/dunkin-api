import { config } from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import comboRouter from "./routes/comboRoute.js";
import donutRouter from "./routes/donutRoute.js";
import userRouter from "./routes/userRoute.js";

export const API_PREFIX = "/api/v1";

config();

const welcome = (req, res) => {
  res.send("meow meow");
};

const corsOptions = {
  origin: "http://localhost:5174",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

const app = express();

const PORT = process.env.PORT || 8080;
const DB_URI = process.env.DB_URI;

const routerInitialization = () => {
  app.use(userRouter);
  app.use(donutRouter);
  app.use(comboRouter);
  app.use("/", welcome);
};

const startServer = () => {
  app.use(express.json());
  app.use(cors(corsOptions));
  console.log("Connected to DB");
  routerInitialization();
  app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
};

mongoose
  .connect(DB_URI)
  .then(startServer)
  .catch((err) => console.error(err));
