import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    // ref: "users",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

//added vituals
const virtual = cartSchema.virtual("id");
virtual.get(function () {
  return this._id; // Use a regular function to access 'this' not arrow fxn (my advice)
});

cartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

export const cartModel = mongoose.model("cart", cartSchema);
