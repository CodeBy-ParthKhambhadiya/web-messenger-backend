import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load .env file

export const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI as string;

    if (!MONGO_URI) {
      throw new Error("MONGO_URI is missing in .env file");
    }

    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ Mongo Error:", err);
    process.exit(1);
  }
};
