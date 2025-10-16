import Counsellor from "../models/counsellorModel.js";

export const addCounsellor = async (req, res) => {
  try {
    const newCounsellor = new Counsellor(req.body);
    await newCounsellor.save();
    res.status(201).json({ message: "Counsellor appointment booked successfully", data: newCounsellor });
  } catch (error) {
    res.status(500).json({ message: "Failed to book counsellor", error: error.message });
  }
};

export const getCounsellors = async (req, res) => {
  try {
    const counsellors = await Counsellor.find();
    res.status(200).json(counsellors);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
