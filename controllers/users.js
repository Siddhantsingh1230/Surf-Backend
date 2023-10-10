import { usersModel } from "../models/users.js";


export const signup = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;
    let user = await usersModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    // const hashedPassword = await bcrypt.hash(password, 10);
    user = await usersModel.create({
      username,
      email,
      phone,
      password,
    });
    res
      .status(201)
      .json({ success: false, data: user, message: "User created" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error:" + error,
    });
  }
};

export const findUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersModel.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found!",
      });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error:" + error,
    });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersModel.updateUserById(id, req.body, { new: true });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found!",
      });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error:" + error,
    });
  }
};

