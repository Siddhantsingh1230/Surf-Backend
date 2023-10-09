import express from "express";
import {
  createBrand,
  createBrands,
  getAllBrands,
} from "../controllers/brands.js";

const router = express.Router();

router.get("/", getAllBrands).post("/", createBrand);
router.post("/createMany", createBrands);
export default router;
