import { brandsModel } from "../models/brands.js";

export const getAllBrands = async (req, res) => {
  try {
    const brands = await brandsModel.find({});
    if (!brands) {
      return res.status(404).json({ success: false, message: "No brands" });
    }
    res.status(200).json({ success: true, brands });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error" + error });
  }
};

export const createBrand = async (req, res) => {
  try {
    const brand = await brandsModel.create({
      ...req.body,
    });
    if (!brand) {
      return res
        .status(400)
        .json({ success: false, message: "Unable to create" });
    }
    res.status(201).json({ success: true, brand });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error" + error });
  }
};
export const createBrands = async (req, res) => {
  try {
    const brands = req.body;
    for (const brand of brands) {
      await brandsModel.create(brand);
    }
    res.status(201).json({ success: true, message: "Brands created" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error" + error });
  }
};
