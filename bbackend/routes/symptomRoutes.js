import express from "express";
import Symptom from "../models/Symptom.js";

const router = express.Router();

// Patient submits symptoms
router.post("/", async (req, res) => {
  try {
    const { patientName, symptoms } = req.body;
    if (!patientName || !symptoms || !symptoms.length) {
      return res.status(400).json({ message: "Patient name and symptoms are required" });
    }
    const newSymptom = new Symptom({ patientName, symptoms });
    await newSymptom.save();
    res.status(201).json(newSymptom);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Doctor fetches all submitted symptoms
router.get("/", async (req, res) => {
  try {
    const allSymptoms = await Symptom.find().sort({ createdAt: -1 });
    res.status(200).json(allSymptoms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
