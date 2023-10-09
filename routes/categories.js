import express from "express";
import { createCategories, createCategory, getAllCategories } from "../controllers/categories.js";

const router = express.Router();

router.get("/", getAllCategories).post("/", createCategory);
router.post("/createMany",createCategories);

export default router;
