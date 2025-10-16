import Patient from "../models/patientModel.js";

export const addPatient = async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).json({ message: "Appointment booked successfully", patient: newPatient });
  } catch (error) {
    res.status(500).json({ message: "Failed to book appointment", error: error.message });
  }
};

export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
