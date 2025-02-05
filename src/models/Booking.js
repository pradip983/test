// models/User.js
import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, require: true },
    id: { type: String },
    date: { type: String, require: true },
    price: { type: String, required: true },
    place: { type: String, require: true },
    createdAt: { type: Date, default: Date.now },

});

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
