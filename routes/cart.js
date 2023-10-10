import express from "express";
import { addToCart, deleteFromCart, fetchCartByUser, updateCart } from "../controllers/cart.js";

const router = express.Router();

router.get("/",fetchCartByUser);
router.post("/",addToCart);
router.delete("/:id",deleteFromCart);
router.patch("/:id",updateCart);

export default router;