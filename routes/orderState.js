import express from "express";
import { createOrderState,getOrderState,createOrderStates,deleteOrderStateById, updateOrderStateById } from "../controllers/orderState.js";

const router = express.Router();
router.get("/",getOrderState).post("/",createOrderState);
router.post("/createOrderStates",createOrderStates);
router.delete("/:id",deleteOrderStateById);
router.patch("/:id",updateOrderStateById)

export default router;