import Donut from "../models/donut.model";

const sendErr = (res, error) => {
  res.status(500).json({ message: error.message });
};

export const getDonuts = async (req, res) => {
  try {
    const donuts = await Donut.find();

    res.status(200).send(donuts);
  } catch (error) {
    sendErr(res, error);
  }
};

export const getDonutById = async (req, res) => {
  try {
    const donut = await Donut.findById(req.params.id);

    res.status(200).json(donut);
  } catch (error) {
    sendErr(res, error);
  }
};

export const createDonut = async (req, res) => {
  try {
  } catch (error) {
    sendErr(res, error);
  }
};

export const updateDonut = async (req, res) => {
  try {
  } catch (error) {
    sendErr(res, error);
  }
};

export const deleteDonut = async (req, res) => {
  try {
  } catch (error) {
    sendErr(res, error);
  }
};
