// models/Destination.js
import mongoose from "mongoose";

const DestinationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.models.Destination || mongoose.model("Destination", DestinationSchema);
