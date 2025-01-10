// models/Destination.js
import mongoose from "mongoose";

const TDestinationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.models.TDestination || mongoose.model("TDestination", TDestinationSchema);
