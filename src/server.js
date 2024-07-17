require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const donutRouter = require("./routes/donut.route");
const app = express();

const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;

const routerInitialization = () => {
  app.use(donutRouter);
};

const startServer = () => {
  app.use(express.json());
  console.log("Connected to DB");
  routerInitialization();
  app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
};

mongoose
  .connect(DB_URI)
  .then(() => {
    startServer();
  })
  .catch((err) => console.error(err));
