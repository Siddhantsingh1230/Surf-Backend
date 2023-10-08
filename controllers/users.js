import { usersModel } from "../models/users.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  const { username, email, password, phone } = req.body;

  let user = await usersModel.findOne({ email });
  if (user) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  user = await usersModel.create({
    username,
    email,
    phone,
    password: hashedPassword,
  });
  res.status(201).json({ success: false, data: user, message: "User created" });
};
