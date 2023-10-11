import express from "express";
import {
  updateOrderById,
  createOrder,
  deleteOrderById,
  getOrdersByUserId,
} from "../controllers/orders.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrdersByUserId);
router.patch("/:id", updateOrderById); 
router.delete("/:id", deleteOrderById);

export default router;
