import mongoose from "mongoose";

const brandsSchema = mongoose.Schema({
    value:{
        type : String,
        required : true,
    },
    label: {
        type : String,
        required : true,
    },
    checked : {
        type : Boolean,
        default : false
    }
})

export const brandsModel = mongoose.Model("brands",brandsSchema)