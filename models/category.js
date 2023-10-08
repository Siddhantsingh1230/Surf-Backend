import mongoose from "mongoose"

const categorySchema = mongoose.Schema({
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

export const categoryModel = mongoose.Model("categories",categorySchema)