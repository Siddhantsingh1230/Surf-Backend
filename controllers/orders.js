import { ordersModel } from "../models/orders.js";

export const createOrder = async (req, res) => {
  try {
    let order = await ordersModel.create(req.body);
    if (!order) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to order!" });
    }
    res.status(200).json({ success: true, order });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error" + error });
  }
};
export const getOrdersByUserId = async (req, res) => {
  const { userId } = req.query;
  try {
    const orders = await ordersModel.find({ userId });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error" + error });
  }
};

export const updateOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await ordersModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!order) {
      return res
        .status(400)
        .json({ success: false, message: "Order not updated" });
    }
    res.status(200).json({ success: true, order });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error" + error });
  }
};
export const deleteOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await ordersModel.findByIdAndDelete(id);
    if (!order) {
      return res
        .status(400)
        .json({ success: false, message: "Order not deleted" });
    }
    res.status(200).json({ success: true, order });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error" + error });
  }
};
