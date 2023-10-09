import mongoose from "mongoose";


const orderStateSchema = new mongoose.Schema({
    value : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    }
})

//added vituals
const virtual = orderStateSchema.virtual("id");
virtual.get(function() {
  return this._id; // Use a regular function to access 'this' not arrow fxn (my advice)
});

orderStateSchema.set("toJSON",{
  virtuals:true,
  versionKey:false,
  transform :(doc,ret)=>{
    delete ret._id
  }
})


export const orderStateModel = mongoose.model("orderstates",orderStateSchema);