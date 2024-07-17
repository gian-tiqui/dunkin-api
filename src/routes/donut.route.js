const express = require("express");
const Donut = require("../models/donut.model");

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

donutRouter.post(API_URI, async (req, res) => {
  try {
    const { name, quantity, imageURI, price } = req.body;

    const savedDonut = await new Donut({
      name,
      quantity,
      imageURI,
      price,
    }).save();

    res.send(savedDonut);
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
