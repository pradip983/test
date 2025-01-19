// lib/dbConnect.js
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI; // Add this in your .env.local file.

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

export async function dbConnect() {
  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect(MONGO_URI);
}
