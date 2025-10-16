import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ["accepted", "later"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model("Notification", notificationSchema, "notifications");

export default Notification;
