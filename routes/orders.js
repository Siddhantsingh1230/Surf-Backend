import express from "express";
import {
  updateOrderById,
  createOrder,
  deleteOrderById,
  getOrdersByUserId,
  getAllOrders,
} from "../controllers/orders.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrdersByUserId);
router.patch("/:id", updateOrderById); 
router.delete("/:id", deleteOrderById);
router.get("/all", getAllOrders);

export default router;
