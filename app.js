import express from "express";

export const app = express();
export const port = 5000;
//Routes

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "All Systems Operational" });
});

