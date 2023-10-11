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
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "users",
        type : String,
        required: true,
    }
})

//added virtuals
const virtual = notificationSchema.virtual("id");
virtual.get(function() {
    return this._id; // Use a regular function to access 'this' not arrow fxn (my advice)
  });
  
  notificationSchema.set("toJSON",{
    virtuals:true,
    versionKey:false,
    transform :(doc,ret)=>{
      delete ret._id
    }
  })


export const notificationModel = mongoose.model("notifications",notificationSchema);
