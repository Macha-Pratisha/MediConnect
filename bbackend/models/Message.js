// models/Message.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  originalText: { type: String, required: true },
  translatedText: { type: String, required: true },
  senderRole: { type: String, enum: ["patient", "doctor"], required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Message", messageSchema);
