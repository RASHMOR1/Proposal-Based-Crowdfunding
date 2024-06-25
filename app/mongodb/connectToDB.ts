"use server";

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      // If already connected, do nothing
      console.log("Already connected to MongoDB");
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI as string, {
      //serverSelectionTimeoutMS: 70000,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Ensure error is thrown to be caught by the calling function
  }
};

export default connectDB;
