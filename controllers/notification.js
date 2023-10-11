import {notificationModel} from '../models/notification.js'

export const getAllNotification = async (req,res)=>{
    try{
        const {userId} = req.query;
        const notifications = await notificationModel.find({userId});
        res.status(200).json({ success: true, notifications });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error" + error });
      }
}
export const createNotification = async (req,res) =>{
    try{
        notificationModel.create({
            ...req.body
        })
        res.status(200).json({
            success : true,
            message : "notification created"
        })
        }catch(error){
            res.status(501).json({
                success : false,
                message : `Failed to add : ${error}`
            })
        }
}

export const deleteNotification = async (req,res)=>{
    try{
        const {id} = req.params;
        const notification = await notificationModel.findByIdAndDelete(id);
        if(!notification){
            res.status(404).json({
                "success" : false,
                "message" : "Notification not found",
            })
        }
        res.status(200).json({
            "success" : true,
            "message ": "Notification deleted"
        })
    }catch(err){
        res.status(500).json({
            "success" : false,
            "message" : `Failed to delete : ${err}`
        })
    }
}

// export updateNotification 