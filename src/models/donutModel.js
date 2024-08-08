import mongoose from "mongoose";

const DonutSchema = new mongoose.Schema(
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
    imageName: {
      type: String,
      required: false,
    },
    imageURI: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: [true, "Donut price required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Donut = mongoose.model("Donut", DonutSchema);

export default Donut;
