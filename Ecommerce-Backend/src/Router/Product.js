const express=require('express');
const {getAllProduct,createProduct,deleteProduct,updateProduct,getProductDetails,createProductReview,getAllReview,deleteProductReview, getAllAdminProducts} = require('../Controllers/Product');
const {isAuthentication,isAuthorizeRole}=require('../../middleware/authentication');

const product=express.Router();


product.get('/product',getAllProduct); 
product.get('/admin/products',isAuthentication,isAuthorizeRole("admin"),getAllAdminProducts);
product.post('/admin/product/new',isAuthentication,isAuthorizeRole("admin"),createProduct);
product.route('/admin/product/:id').put(isAuthentication,isAuthorizeRole("admin"),updateProduct).delete(isAuthentication,isAuthorizeRole("admin"),deleteProduct)
product.route('/product/:id').get(getProductDetails);
product.route('/review').put(isAuthentication,createProductReview);
product.route('/admin/reviews').get(getAllReview);
product.route('/admin/review/delete').delete(isAuthentication,isAuthorizeRole("admin"),deleteProductReview);

module.exports=product;