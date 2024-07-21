import express from "express";
import multer from "multer";
import Donut from "../models/donut.model.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname);

const storage = multer.diskStorage({
  destination: "uploads/",
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Only jpg, jpeg, and png files are allowed!"));
    }
    cb(null, true);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

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
    const imageName = req.file.originalname;

    const savedDonut = await new Donut({
      name,
      quantity,
      imageName,
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
  try {
    const donutId = req.params.id;
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

donutRouter.delete(`${API_URI}/:id`, async (req, res) => {
  try {
    const donutID = req.params.id;
    const foundDonut = await Donut.findById(donutID);
    const imageName = foundDonut.imageName;
    const filePath = path.join(__dirname, "..", "..", "uploads", imageName);

    console.log(filePath);
    try {
      fs.unlinkSync(filePath);
    } catch (error) {
      console.error("Error deleting image file:", error);
    }

    await Donut.deleteOne({ _id: donutID });

    res.status(202).send({ message: "Donut deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default donutRouter;
