import { orderStateModel } from "../models/orderState.js";

export const getOrderState = async (req,res) => {
    try {
        const orderState = await orderStateModel.find({});
        if (!orderState) {
          return res.status(404).json({ success: false, message: "No orderStates" });
        }
        res.status(200).json({ success: true, orderState });
      } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" + error });
      }
  };

export const createOrderState = async (req,res) => {
    const {title} = req.body;
    try{
        let orderState = await orderStateModel.findOne({title});
    if(orderState)
    {
        return res.status(400).json({
            success : false,
            message : "order state already exist",
        });
    }
    orderState = await orderStateModel.create({
        ...req.body,
    });
    res.status(201).json({
        success : true,
        message : `${orderState.title} added `,orderState
    })
        return data;
    } catch (err){
        res.status(400).json({
            succes : false , 
            message : `failed to add :${err}`,
        })
    }
  };

  export const createorderStates = async (req, res) => {
    try {
      const orderStates = req.body;
      for (const orderState of orderStates) {
        await orderStateModel.create(orderState);
      }
      res.status(201).json({ success: true, message: "orderStates created" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" + error });
    }
  };