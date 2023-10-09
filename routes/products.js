import express from "express";
import { createProduct,createProducts,getAllProducts, getProductById } from "../controllers/products.js";
const router = express.Router();

router.get("/", getAllProducts).post("/", createProduct);
router.post("/createMany",createProducts);
router.get("/:id",getProductById);

export default router;
