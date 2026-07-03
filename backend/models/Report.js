import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  reporterUserId: {
    type: String,
    required: true,
  },

  reportedUserId: {
    type: String,
    required: true,
  },

  messageContent: {
    type: String,
    required: true,
  },

  

  reportDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Report", reportSchema);