import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique:true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
    min: [1, "wrong min discount"],
    max: [99, "wrong max discount"],
    default: 0,
  },
  rating: {
    type: Number,
    min: [1, "wrong min rating"],
    max: [5, "wrong max rating"],
    default: 1,
  },
  stock: {
    type: Number,
    min: [0, "wrong min stock"],
    default: 0,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//added vituals
const virtual = productsSchema.virtual("id");
virtual.get(function() {
  return this._id; // Use a regular function to access 'this' not arrow fxn (my advice)
});

productsSchema.set("toJSON",{
  virtuals:true,
  versionKey:false,
  transform :(doc,ret)=>{
    delete ret._id
  }
})

export const productsModel = mongoose.model("products", productsSchema);
