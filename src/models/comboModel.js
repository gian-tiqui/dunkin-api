import mongoose from "mongoose";
import Donut from "./donutModel";

const ComboSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Combo name is required"],
    },
    donuts: {
      type: [Donut.Schema],
      required: [true, "Donuts are required"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    available: {
      type: Boolean,
      required: [true, "Availability is required"],
    },
  },
  { timestamps: true }
);

const Combo = mongoose.model(ComboSchema);

export default Combo;