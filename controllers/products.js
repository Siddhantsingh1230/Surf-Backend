import { productsModel } from "../models/products.js";

export const createProduct = async (req, res) => {
  const { title } = req.body;
  try {
    let product = await productsModel.findOne({ title });
    if (product) {
      return res.status(400).json({
        success: false,
        message: "Product Already Exists with the same title",
      });
    }
    product = await productsModel.create({
      ...req.body,
    });
    res
      .status(201)
      .json({ success: true, mesage: `${product.title} added`, product });
  } catch (error) {
    res.status(400).json({ success: false, mesage: `Fail to add : ${error}` });
  }
};

export const getAllProduct = async (req, res) => {
  res.send("hello");
};
