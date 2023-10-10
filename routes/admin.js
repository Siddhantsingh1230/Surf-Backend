import express from "express";
import { adminSignup } from "../controllers/admin.js";

const router = express.Router();
router.post("/",adminSignup);

export default router;
