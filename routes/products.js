import express from "express";
import { createProduct,createProducts,getAllProducts } from "../controllers/products.js";
const router = express.Router();

router.get("/", getAllProducts).post("/", createProduct);
router.post("/createMany",createProducts);

export default router;
