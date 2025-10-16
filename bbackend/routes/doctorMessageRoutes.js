import express from "express";
import DoctorMessage from "../models/DoctorMessage.js";

const router = express.Router();

// Simple English → Telugu mapping
const translateToTelugu = (text) => {
  const map = {
    "Do you feel anything else?": "ఇంకా ఏమైనా అనిపిస్తుందా",
    "After having your dinner, take the headache pill and sleep": "రాత్రి భోజనం చేసిన తర్వాత, తలనొప్పి మాత్ర వేసుకుని నిద్రపోండి",
    "After taking your meal , take the tablet and rest for some time.": "భోజనం చేసిన తర్వాత, టాబ్లెట్ వేసుకుని కొంతసేపు విశ్రాంతి తీసుకోండి"
  };
  return map[text] || "అనువాదం లేదు"; // "No translation" fallback
};

// POST - Doctor sends message
router.post("/", async (req, res) => {
  try {
    const { text, senderRole } = req.body;
    if (!text || !senderRole) return res.status(400).json({ error: "Missing fields" });

    const translatedText = translateToTelugu(text);
    const msg = new DoctorMessage({ originalText: text, translatedText, senderRole });
    await msg.save();

    res.json(msg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET - Patient fetches doctor messages
router.get("/", async (req, res) => {
  try {
    const msgs = await DoctorMessage.find().sort({ createdAt: 1 });
    res.json(msgs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
