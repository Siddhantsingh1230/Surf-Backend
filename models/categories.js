import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    unique: true,
  },
  label: {
    type: String,
    required: true,
    unique: true,
  },
  checked: {
    //not required
    type: Boolean,
    default: false,
  },
});

//added vituals
const virtual = categorySchema.virtual("id");
virtual.get(function () {
  return this._id; // Use a regular function to access 'this' not arrow fxn (my advice)
});

categorySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

export const categoryModel = mongoose.model("categories", categorySchema);
