import express from "express";
import { createOrderState,getOrderState,createorderStates } from "../controllers/orderState.js";

const router = express.Router();
router.get("/",getOrderState).post("/",createOrderState);
router.post("/createOrderStates",createorderStates);

export default router;