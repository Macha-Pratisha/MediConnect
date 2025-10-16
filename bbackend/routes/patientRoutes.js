import express from "express";
import { addPatient, getPatients } from "../controllers/patientController.js";

const router = express.Router();

router.post("/", addPatient);
router.get("/", getPatients);

export default router;
