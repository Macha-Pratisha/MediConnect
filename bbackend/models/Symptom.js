import mongoose from "mongoose";

const symptomSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  symptoms: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
});

const Symptom = mongoose.model("Symptom", symptomSchema, "symptoms");
export default Symptom;
