import mongoose from "mongoose";

const counsellorSchema = new mongoose.Schema({
  patientName: String,
  email: String,
  phone: String,
  preferredDate: String,
  symptoms: String,
  doctor: String,
  hospital: String,
  specialty: String,
});

// explicitly specify collection name "patients2"
const Counsellor = mongoose.model("Counsellor", counsellorSchema, "patients2");

export default Counsellor;
