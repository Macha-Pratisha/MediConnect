import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  patientName: String,
  email: String,
  phone: String,
  preferredDate: String,
  symptoms: String,
  doctor: String,
  hospital: String,
  specialty: String,
});

// explicitly specify collection name "patients"
const Patient = mongoose.model("Patient", patientSchema, "patients");

export default Patient;
