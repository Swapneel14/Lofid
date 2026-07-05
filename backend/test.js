import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected!");
} catch (err) {
  console.error(err);
}