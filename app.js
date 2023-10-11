import express from "express";
import { configDotenv } from "dotenv";
import path from "path";
import productsRouter from "./routes/products.js";
import brandsRouter from "./routes/brands.js";
import categoriesRouter from "./routes/categories.js";
import orderStateRouter from "./routes/orderState.js";
import cartRouter from "./routes/cart.js";
import ordersRouter from "./routes/orders.js";
import notificationRouter from "./routes/notification.js";
import userRouter from "./routes/users.js";
import cors from "cors";
import { usersModel } from "./models/users.js";
import passport from "passport";
import session from "express-session";
import { Strategy as LocalStrategy } from "passport-local";
import { isAuthenticated } from "./middlewares/Auth.js";
import crypto from "crypto";

export const app = express();

//Middlewares
app.use(express.json());
app.use(express.static(path.join(path.resolve(), "public")));
//environment variables
configDotenv({
  path: "./data/config.env",
});
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);
app.use(passport.authenticate("session"));

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
app.use("/cart", cartRouter);
app.use("/orders", ordersRouter);
app.use("/notifications", notificationRouter);
app.use("/user", userRouter);

//Login logic
passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      let user = await usersModel
        .findOne({ email: username })
        .select("+password");
      if (!user) {
        return done(null, false, { message: "User not found" }); //not authorized as no user found
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async (err, hashedPassword) => {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: "Wrong credentials" }); //not authorized
          }
          // Authorized
          /// Sanitizing user
          user = user.toObject();
          delete user["password"]; // remove password field from response
          user.id = user._id;
          // Remove the original '_id' field
          delete user._id;
          delete user.__v;
          delete user.salt;
          done(null, user);
        }
      );
    } catch (error) {
      done(error);
    }
  })
);

/// this create session varible req.user
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, { id: user.id });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

//Default route
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "All Systems Operational" });
});
