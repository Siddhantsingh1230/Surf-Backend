import mongoose from "mongoose";


const orderStateSchema = mongoose.Schema({
    value : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    }
})


export const orderStateModel = mongoose.Model("orderstates",orderStateSchema);
