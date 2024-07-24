import Donut from "../models/donut.model";

// continue MVC later

export const getDonuts = async (req, res) => {
  try {
    const donuts = await Donut.find();

    res.status(200).send(donuts);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
