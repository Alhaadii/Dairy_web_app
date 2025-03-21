import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/mernstack";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {});
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed");
    process.exit(1);
  }
};

export default connectDB;
