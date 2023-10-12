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

export const getAllProducts = async (req, res) => {
  let query = productsModel.find({});
  // case insensitive find or search
  if (req.query.category) {
    query = query.find({
      category: { $regex: new RegExp(req.query.category, "i") },
    });
  }
  if (req.query.brand) {
    query = query.find({
      brand: { $regex: new RegExp(req.query.brand, "i") },
    });
  }
  // sorting and filterin      g
  if (req.query._sort && req.query._order) {
    const sortField = req.query._sort;
    const sortOrder = req.query._order === "asc" ? 1 : -1;
    query = query.sort({ [sortField]: sortOrder });
  }
  const countQuery = query.clone();
  const totalCount = await countQuery.countDocuments().exec();

  if (req.query._page && req.query._limit) {
    const pageSize = parseInt(req.query._limit);
    const page = parseInt(req.query._page);
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }
  try {
    res.set("X-Total-Count", totalCount);
    const docs = await query.exec();
    res.status(200).json({
      success: true,
      products: docs,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error" + error });
  }
};

export const createProducts = async (req, res) => {
  try {
    const products = req.body;
    for (const product of products) {
      await productsModel.create(product);
    }
    res.status(201).json({ success: true, message: "Products created" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error" + error });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsModel.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error" + error });
  }
};

export const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product not updated" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error" + error });
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsModel.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product not deleted" });
    }
    res.status(200).json({ success: true, message: "Product Deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error" + error });
  }
};
