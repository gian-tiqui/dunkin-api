import Donut from "../models/donutModel.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendErr = (res, error) => {
  return res.status(500).json({ message: error.message });
};

export const getDonuts = async (req, res) => {
  try {
    const donuts = await Donut.find();

    return res.status(200).send({ status: "ok", data: { donuts: donuts } });
  } catch (error) {
    sendErr(res, error);
  }
};

export const getDonutById = async (req, res) => {
  try {
    const donutID = req.params.id;
    const foundDonut = await Donut.findById(donutID);

    return res.status(200).json({ status: "ok", data: { donut: foundDonut } });
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

    return res.status(201).send({
      status: "created",
      data: { donut: savedDonut },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ message: messages });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const updateDonut = async (req, res) => {
  try {
    const donutId = req.params.id;

    const donut = await Donut.findById(donutId);
    if (!donut) {
      return res.status(404).json({ message: "Donut not found" });
    }

    const { name, quantity, price } = req.body;

    donut.name = name ? name : donut.name;
    donut.quantity = quantity ? quantity : donut.quantity;
    donut.price = price ? price : donut.price;

    if (req.file) {
      const imageURI = path.join(__dirname, "uploads", req.file.filename);
      const imageName = req.file.originalname;
      const imageToDelete = donut.imageName;

      const filePath = path.join(
        __dirname,
        "..",
        "..",
        "uploads",
        imageToDelete
      );

      try {
        fs.unlinkSync(filePath);
      } catch (error) {
        console.error("Error deleting image file:", error);
      }

      donut.imageURI = imageURI;
      donut.imageName = imageName;
    }

    await Donut.findByIdAndUpdate(donutId, donut);

    return res.status(200).send({ status: "updated", data: { donut } });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ message: messages });
    } else {
      return res.status(500).json({ message: error.message });
    }
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

    return res
      .status(202)
      .send({ message: "Donut deleted successfully", status: "success" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
