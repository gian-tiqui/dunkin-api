require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;

mongoose
  .connect(DB_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error(err));

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
