// models/User.js
import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  username: { type: String, required: true,  },
  image: { type: String, },
  comment: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);
