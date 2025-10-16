import express from "express";
import Notification from "../models/Notification.js";

const router = express.Router();

// Create a new notification
router.post("/", async (req, res) => {
  try {
    const { patientName, message, status } = req.body;
    const notification = new Notification({ patientName, message, status });
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: "Error creating notification", error });
  }
});

// Get all notifications
router.get("/", async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error });
  }
});

export default router;
