const catchAsyncError=require('../../middleware/catchAsyncError');
const stripe =require('stripe')(process.env.STRIPE_SECRET_KEY);

//for processing the payment
const paymentProcess=catchAsyncError(async (req,res,next)=>{
    const payment=await stripe.paymentIntents.create({
          amount:req.body.amount,
          currency:"inr",
          metadata:{
            company:"Ecommerce"
          }
    });
    res.status(200).json({
        success:true,
        client_secret:payment.client_secret,
    })
});

//for sending stripe Publish Key
const sendApiKey=catchAsyncError((req,res,next)=>{
    const key=process.env.STRIPE_PUBLISH_KEY;
    res.status(200).json({
        success:true,
        key:key
    })
})

module.exports={paymentProcess,sendApiKey}