import mongoose from "mongoose";

const userTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 2592000, // 30 days in seconds
  },
});

const UserToken = mongoose.model("UserToken", userTokenSchema);

export default UserToken;
