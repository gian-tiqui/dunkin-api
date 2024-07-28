import express from "express";
import multer from "multer";
import Donut from "../models/donut.model.js";
import fs from "fs";
import {
  createDonut,
  deleteDonut,
  getDonutById,
  getDonuts,
  updateDonut,
  welcome,
} from "../controllers/donut.controller.js";

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

donutRouter.get("/", welcome);
donutRouter.get(API_URI, getDonuts);
donutRouter.get(`${API_URI}/:id`, getDonutById);
donutRouter.post(API_URI, upload.single("image"), createDonut);
donutRouter.patch(`${API_URI}/:id`, updateDonut);
donutRouter.delete(`${API_URI}/:id`, deleteDonut);

export default donutRouter;
