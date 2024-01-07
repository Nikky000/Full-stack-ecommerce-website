const express=require("express");
const Products=require('../Model/Product');
const ErrorHandling =require('../../utils/Errorhandling');
const catchAsyncError = require('../../middleware/catchAsyncError');
const Orders=require('../Model/Order');
 
//Creating new order
const newOrder=catchAsyncError(async (req,res,next)=>{
    const {
        shippingInfo,
        orderItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
    }=req.body;
    const order=await Orders.create({
        shippingInfo,
        orderItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        user:req.user._id,
        paidAt:Date.now(),
    });
    res.status(201).json({
        success:true,
        order
    })
});

//getLoggedOrder
const getLoggedOrder=catchAsyncError(async (req,res,next)=>{
    const order = await Orders.find({user:req.user._id}).populate("user","name");
    res.status(200).json({
        success:true,
        order
    })
})

//admin

//getSingleOrder
const getSingleOrder= catchAsyncError(async (req,res,next)=>{
    const order = await Orders.findById(req.params.id).populate("user","name email");
    if(!order){
        return next(new ErrorHandling(404,"Order not found"));
    };
    res.status(200).json({
        success:true,
        order
    });
});



//getAllOrders
const getAllOrders=catchAsyncError(async (req,res,next)=>{
    const orders=await Orders.find();
    let totalAmount=0;
    orders.forEach((order)=>{
        totalAmount+=order.totalPrice;
    })
    res.status(200).json({
        success:true,
        orders,
        totalAmount
    });
})

//update Order Status
const updateOrderStatus=catchAsyncError(async (req,res,next)=>{
    const order=await Orders.findById(req.params.id);
    if(!order){
        return next( new ErrorHandling(404,"Order not found"));
    };
    if(order.orderStatus==="Delivered"){
        return next(new ErrorHandling(400,"Order has delivered already"));
    };

    if(req.body.status==="Shipped"){
    order.orderItems.forEach(async (item)=>{
        await updateStock(item.product,item.quantity);
    });
    }
    
    if(req.body.status==="Delivered"){
        order.deliveredAt=Date.now();
    };
    order.orderStatus=req.body.status;
    await order.save({validateBeforeSave:false});
    res.status(200).json({
        success:true,
        message:"update Status Successfully"
    })
});

const updateStock=async(id,quantity)=>{
    const product = await Products.findById(id);
    product.stock-=quantity;
    await product.save({validateBeforeSave:false});
};

//Delete Order
const deleteOrder=catchAsyncError(async (req,res,next)=>{
    const order = Orders.findById(req.params.id);
    if(!order){
        return next( new ErrorHandling(404,"Order not found"));
    };
    await Orders.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success:true,
        message:"delete Successfully"
    })
})

module.exports={newOrder,getLoggedOrder,getSingleOrder,getAllOrders,updateOrderStatus,deleteOrder};