const express = require("express");

const donutRouter = express.Router();

const API_URI = "/api/v1/donuts";

donutRouter.get(API_URI, async (req, res) => {
  res.send("hi");
});

donutRouter.post(API_URI, async (req, res) => {
  res.send(req.body);
});

donutRouter.patch(API_URI, async (req, res) => {
  res.send(req.body);
});

donutRouter.delete(API_URI, async (req, res) => {
  res.send(req.body);
});

module.exports = donutRouter;
