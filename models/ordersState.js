import mongoose from "mongoose";


const orderStatesSchema = new mongoose.Schema({
    value : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    }
})


export const orderStatesModel = mongoose.model("orderstates",orderStatesSchema);