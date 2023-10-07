import express from "express";
import { configDotenv } from "dotenv";

export const app = express();

//-Middlewares

//environment variables
configDotenv({
  path: "./data/config.env",
});

//-Routes
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "All Systems Operational" });
});
