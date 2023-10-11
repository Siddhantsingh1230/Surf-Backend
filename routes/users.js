import express from "express";
import passport from "passport";
import { getUser, login, signup } from "../controllers/users.js";

const router = express.Router();

router.post("/signup", signup).post("/login", passport.authenticate("local"), login);
router.get("/",getUser);

export default router;
