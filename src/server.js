import { config } from "dotenv";
import path from "path";
import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import comboRouter from "./routes/comboRoute.js";
import donutRouter from "./routes/donutRoute.js";
import refreshTokenRouter from "./routes/refreshTokenRoute.js";
import { fileURLToPath } from "url";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/usersRoute.js";

export const API_PREFIX = "/api/v1";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 8080;
const DB_URI = process.env.DB_URI;

const routerInitialization = () => {
  app.use(authRouter);
  app.use(refreshTokenRouter);
  app.use(userRouter);
  app.use(donutRouter);
  app.use(comboRouter);
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
