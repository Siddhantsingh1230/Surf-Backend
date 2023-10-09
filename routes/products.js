import express from "express";
import {
  createProduct,
  createProducts,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from "../controllers/products.js";
const router = express.Router();

router.get("/", getAllProducts).post("/", createProduct);
router.post("/createMany", createProducts);
router.get("/:id", getProductById);
router.patch("/:id", updateProductById);
router.delete("/:id", deleteProductById);

export default router;
