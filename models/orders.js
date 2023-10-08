import mongoose from "mongoose";


const ordersSchema = mongoose.SchemaTypes({
    checkoutEmail : {
        type : String,
        required : true,
    },
    billingaddress : {
        type : String,
        required : true,
    },
    billingstate : {
        type : String,
        required : true,
    },
    billingzip : {
        type : Number,
        required : true,
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        required : true
    },
    paymentMethod : {
        type : String,
        default :"CashOnDelivery",
    },
    cart : {
        type : [mongoose.Schema.Types.Mixed],
        required : true
    }
})


export const  ordersModel = mongoose.Model("orders",ordersSchema)