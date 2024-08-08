import Donut from "../models/donutModel.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const welcome = (req, res) => {
  res.send("meow meow");
};

const sendErr = (res, error) => {
  res.status(500).json({ message: error.message });
};

export const getDonuts = async (req, res) => {
  try {
    const donuts = await Donut.find();

    res.status(200).send({ status: "ok", data: { donuts: donuts } });
  } catch (error) {
    sendErr(res, error);
  }
};

export const getDonutById = async (req, res) => {
  try {
    const donutID = req.params.id;
    const foundDonut = await Donut.findById(donutID);

    res.status(200).json(foundDonut);
  } catch (error) {
    sendErr(res, error);
  }
};

export const createDonut = async (req, res) => {
  try {
    const { name, quantity, price, user } = req.body;

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
      user,
    }).save();

    res.status(201).send({
      status: "created",
      data: { donut: savedDonut },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      res.status(400).json({ message: messages });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

export const updateDonut = async (req, res) => {
  try {
    const donutId = req.params.id;
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const deleteDonut = async (req, res) => {
  try {
    const donutID = req.params.id;
    const foundDonut = await Donut.findById(donutID);
    const imageName = foundDonut.imageName;
    const filePath = path.join(__dirname, "..", "..", "uploads", imageName);

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
};
