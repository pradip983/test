import mongoose from "mongoose";

const SearchSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.models.Search || mongoose.model("Search", SearchSchema);