import mongoose from "mongoose";

const CDestinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
});

export default mongoose.models.CDestination || mongoose.model("CDestination", CDestinationSchema);
