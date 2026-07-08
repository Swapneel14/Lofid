const mongoose = require("mongoose");

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

module.exports = mongoose.model("BannedUser", bannedUserSchema);