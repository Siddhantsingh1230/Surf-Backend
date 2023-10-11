import { usersModel } from "../models/users.js";
import crypto from "crypto";

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
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      password,
      salt,
      310000,
      32,
      "sha256",
      async (err, hashedPassword) => {
        user = await usersModel.create({
          username,
          email,
          phone,
          password: hashedPassword,
          salt,
        });
        /// Sanitizing user
        user = user.toObject();
        delete user["password"];
        delete user["salt"];
        user.id = user._id;
        // Remove the original '_id' field
        delete user._id;
        delete user.__v;

        // to create session once user is created
        req.login(user, (err) => {
          if (err) {
            res.status(500).json({
              success: false,
              message: "Error:" + error,
            });
          }
          // user is send to the client
          res
            .status(201)
            .json({ success: true, user, message: "User created" });
        });
      }
    );
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

export const login = (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

export const getUser = (req, res) => {
  if (!req.user) {
    return res
      .status(404)
      .json({ success: false, message: "user not logged in" });
  }
  res.status(200).json({ success: true, user: req.user });
};
