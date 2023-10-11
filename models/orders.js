import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
  checkoutEmail: {
    type: String,
    required: true,
  },
  billingaddress: {
    type: String,
    required: true,
  },
  
  billingstate: {
    type: String,
    required: true,
  },
  billingzip: {
    type: Number,
    required: true,
  },
  userId: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "users",
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  cart: {
    type: [mongoose.Schema.Types.Mixed],
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  cardholder: {
    type: String,
    default: "",
  },
  cardno: {
    type: String,
    default: "",
  },
  creditexpiry: {
    type: String,
    default: "",
  },
  cardcvv: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
});

//added vituals
const virtual = ordersSchema.virtual("id");
virtual.get(function() {
  return this._id; // Use a regular function to access 'this' not arrow fxn (my advice)
});

ordersSchema.set("toJSON",{
  virtuals:true,
  versionKey:false,
  transform :(doc,ret)=>{
    delete ret._id
  }
})

export const ordersModel = mongoose.model("orders", ordersSchema);
