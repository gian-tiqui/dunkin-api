const express = require("express");
const multer = require("multer");
const path = require("path");
const Donut = require("../models/donut.model");

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Only jpg, jpeg, and png files are allowed!"));
    }
    cb(null, file.originalname);
  },
});

const donutRouter = express.Router();

const API_URI = "/api/v1/donuts";

donutRouter.get("/", (req, res) => {
  res.send("meow meow ni");
});

donutRouter.get(API_URI, async (req, res) => {
  try {
    const donuts = await Donut.find();

    res.status(200).send(donuts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

donutRouter.get(`${API_URI}/:id`, async (req, res) => {
  try {
    const donutID = req.params.id;
    const foundDonut = await Donut.findById(donutID);

    res.status(200).json(foundDonut);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

donutRouter.post(API_URI, upload.single("image"), async (req, res) => {
  try {
    const { name, quantity, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const imageURI = path.join(__dirname, "uploads", req.file.filename);

    console.log(imageURI);

    const savedDonut = await new Donut({
      name,
      quantity,
      imageURI,
      price,
    }).save();

    res.status(201).send(savedDonut);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      res.status(400).json({ message: messages });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

donutRouter.patch(`${API_URI}/:id`, async (req, res) => {
  const donutID = req.params.id;
  const foundDonut = await Donut.findById(donutID);
});

donutRouter.delete(`${API_URI}/:id`, async (req, res) => {
  const donutID = req.params.id;
  const foundDonut = await Donut.findById(donutID);
});

module.exports = donutRouter;
