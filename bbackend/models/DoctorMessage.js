import mongoose from "mongoose";

const doctorMessageSchema = new mongoose.Schema({
  originalText: { type: String, required: true }, // English message
  translatedText: { type: String, required: true }, // Telugu message
  senderRole: { type: String, enum: ["doctor", "patient"], required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("DoctorMessage", doctorMessageSchema);
