import mongoose from "mongoose";


const usersSchema = new mongoose.Schema({
    username:{
        type : String,
        required : true,
    },
    phone:{
        type : Number,
        required : true,
    },
    email:{
        type : String,
        unique : true,
        required : true,
    },
    password:{
        type : String,
        select : false,
        required : true,
    },
    profileImageURL:{
        type:String,
        default : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    enableNotifications:{
        type : Boolean,
        default : true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})


export const usersModel = mongoose.model("users",usersSchema);
