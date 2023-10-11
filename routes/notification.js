import express from "express";
import { getAllNotification,createNotification, deleteNotification } from "../controllers/notification.js";

const router = express.Router();
router.get("/",getAllNotification).post("/",createNotification)
.delete("/:id",deleteNotification)


export default router;