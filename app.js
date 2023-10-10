import express from "express";
import { configDotenv } from "dotenv";
import path from "path";
import productsRouter from "./routes/products.js";
import brandsRouter from "./routes/brands.js";
import categoriesRouter from "./routes/categories.js";
import orderStateRouter from "./routes/orderState.js";
import adminRouter from "./routes/admin.js"
import cors from "cors";
export const app = express();

//Middlewares
app.use(express.json());
app.use(express.static(path.join(path.resolve(), "public")));

//environment variables
configDotenv({
  path: "./data/config.env",
});

//CORS
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URI,
      process.env.ADMIN_FRONTEND_URI,
      "http://localhost:5000",
      "http://localhost:3000",
    ],
    method: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

//Routes
app.use("/products", productsRouter);
app.use("/brands", brandsRouter);
app.use("/category", categoriesRouter);
app.use("/orderState", orderStateRouter);
app.use("/admin",adminRouter);

//Default route
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "All Systems Operational" });
});
