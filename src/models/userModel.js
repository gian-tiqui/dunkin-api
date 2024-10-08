import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    roles: {
      type: [String],
      enum: ["user", "admin", "superadmin"],
      default: ["user"],
      required: [true, "Role is required"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
