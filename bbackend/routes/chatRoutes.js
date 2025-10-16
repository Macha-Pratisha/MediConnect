// routes/chatRoutes.js
import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

// Simple inline translation map for Telugu → English
const inlineTranslate = (text) => {
  const map = {
    "డాక్టర్ నాకు తలనొప్పిగా ఉంది": "Doctor I am having a headache",
    "నాకు తల తిరుగుతోంది": "I am dizziness",
    "నా కడుపు నొప్పిగా ఉంది": "My stomach is paining",
  };
  return map[text] || "Translation unavailable";
};

// Patient sends Telugu message
router.post("/", async (req, res) => {
  try {
    const { text, senderRole } = req.body;
    if (!text || !senderRole) return res.status(400).json({ error: "Missing fields" });

    const translatedText = inlineTranslate(text);
    const msg = new Message({ originalText: text, translatedText, senderRole });
    await msg.save();

    res.json(msg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Doctor (or both) fetch messages
router.get("/", async (req, res) => {
  try {
    const msgs = await Message.find().sort({ createdAt: 1 });
    res.json(msgs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
