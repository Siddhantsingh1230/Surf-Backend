import {adminModel} from "../models/admin.js"
import bcrypt from "bcrypt";

export const adminSignup = async (req, res) => {
  const { username, email, password } = req.body;

  let admin = await adminModel.findOne({ email });
  if (admin) {
    res.status(400).json({
      success: false,
      message: "admin with this emailId already exist",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  admin = await adminModel.create({
    username,
    email,
    password: hashedPassword,
  });
  res.status(200).json({
    success : true,
    message : "Admin created"
  })
};
