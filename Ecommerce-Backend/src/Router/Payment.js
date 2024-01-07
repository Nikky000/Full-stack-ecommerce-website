const express=require('express');
const app=express.Router();
const {paymentProcess,sendApiKey} = require('../Controllers/payment');
const {isAuthentication} = require('../../middleware/authentication');
app.post('/payment/process',isAuthentication,paymentProcess);
app.get('/payment/apiKey',isAuthentication,sendApiKey);

module.exports=app;