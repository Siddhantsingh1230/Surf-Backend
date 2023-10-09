import mongoose from "mongoose"


const notificationSchema = new mongoose.Schema({
    msg:{
        type : String,
        required : true,
    },
    createdAt : {
        type :Date,
        default : Date.now()
    },
    read :{
        type : Boolean,
        default : false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    }
})


export const notificationModel = mongoose.model("notifications",notificationSchema);
