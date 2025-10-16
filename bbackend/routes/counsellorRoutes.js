import express from "express";
import { addCounsellor, getCounsellors } from "../controllers/counsellorController.js";

const router = express.Router();

router.post("/", addCounsellor);
router.get("/", getCounsellors);

export default router;
