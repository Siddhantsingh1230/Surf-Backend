import mongoose from "mongoose";


const orderStatesSchema = mongoose.Schema({
    value : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    }
})


export const orderStatesModel = mongoose.Model("orderstates",orderStatesSchema);