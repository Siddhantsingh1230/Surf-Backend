import { cartModel } from "../models/cart.js";

export const addToCart = async (req, res) => {
  try {
    let cart = new cartModel(req.body);
    const doc = await cart.save();
    if (!doc) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to add!" });
    }
    cart = await doc.populate("product");

    res.status(200).json({ success: true, cart });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error" + error });
  }
};

export const fetchCartByUser = async (req, res) => {
  try {
    const { userId } = req.query;
    const cart = await cartModel.find({ userId }).populate("product");
    if (!cart) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to get cart!" });
    }
    res.status(200).json({ success: true, cart });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error" + error });
  }
};

export const deleteFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await cartModel.findByIdAndDelete(id);
    if (!cart) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to delete cart item!" });
    }
    res.status(200).json({ success: true, cart });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error" + error });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await cartModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!cart) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to update cart!" });
    }
    res.status(200).json({ success: true, cart });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error" + error });
  }
};
