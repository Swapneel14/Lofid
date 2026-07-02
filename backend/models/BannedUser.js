import mongoose from "mongoose";

const bannedUserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },

  expiredAt: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("BannedUser", bannedUserSchema);