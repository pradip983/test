// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true,  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String, require: true },
  image: { type: String, require: true },
  bio: { type: String, require: true },
  booking: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
  createdAt: { type: Date, default: Date.now },

});

export default mongoose.models.User || mongoose.model("User", UserSchema);
