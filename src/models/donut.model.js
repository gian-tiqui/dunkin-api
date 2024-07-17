const mongoose = require("mongoose");

const DonutSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Donut name required"],
    },
    quantity: {
      type: String,
      required: true,
      default: 0,
    },
    imageURI: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: [true, "Donut price required"],
    },
  },
  {
    timestamp: true,
  }
);

const Donut = mongoose.model("Donut", DonutSchema);

module.exports = Donut;
