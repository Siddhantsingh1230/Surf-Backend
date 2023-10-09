import { categoryModel } from "../models/categories.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    if (!categories) {
      return res.status(404).json({ success: false, message: "No categories" });
    }
    res.status(200).json({ success: true, categories });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error" + error });
  }
};

export const createCategory = async (req, res) => {
  try {
    const category = await categoryModel.create({
      ...req.body,
    });
    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "Unable to create" });
    }
    res.status(201).json({ success: true, category });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error" + error });
  }
};

export const createCategories = async (req, res) => {
  try {
    const categories = req.body;
    for (const category of categories) {
      await categoryModel.create(category);
    }
    res.status(201).json({ success: true, message: "Categories created" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error" + error });
  }
};
