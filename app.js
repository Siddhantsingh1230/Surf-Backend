import express from "express";
import { configDotenv } from "dotenv";
import path from "path";

export const app = express();

//-Middlewares
app.use(express.json());
app.use(express.static(path.join(path.resolve(), "public")));
//environment variables
configDotenv({
  path: "./data/config.env",
});

//-Routes
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "All Systems Operational" });
});
