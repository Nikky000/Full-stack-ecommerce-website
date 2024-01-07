import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// for getting the all product
const getProducts = createAsyncThunk("gets/getProducts", async (data,{rejectWithValue}) => {
    try {
        let {keyword,currentPage,price,rating,Category}=data;
        if(keyword===undefined){
            keyword="";
        }
        let link=`https://ecommerce-plaza-aryanhac.onrender.com/api/product?keyword=${keyword}&page=${currentPage}&ratings[gte]=${rating[0]}&ratings[lte]=${rating[1]}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
        if(Category){
            link=`https://ecommerce-plaza-aryanhac.onrender.com/api/product?keyword=${keyword}&page=${currentPage}&ratings[gte]=${rating[0]}&ratings[lte]=${rating[1]}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${Category}`;
        }
        const response = await axios.get(link);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// for getting the particular product detail
const getProductDetail = createAsyncThunk("gets/getProductDetail", async (id,{rejectWithValue}) => {
    try {
        const response = await axios.get(`https://ecommerce-plaza-aryanhac.onrender.com/api/product/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

//for adding the review 
const addReview = createAsyncThunk("put/putReview", async (data,{rejectWithValue}) => {
    try {
        const confiq={headers:{"Content-Type":"application/json"},withCredentials:true};
        const response = await axios.put(`https://ecommerce-plaza-aryanhac.onrender.com/api/review`,data,confiq);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

//getting all products --admin
const getAllProducts = createAsyncThunk("gets/getAllProducts", async (data,{rejectWithValue}) => {
    try {
        const response = await axios.get(`https://ecommerce-plaza-aryanhac.onrender.com/api/admin/products`,{withCredentials:true});
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
// for creating new Product --admin
const newProduct = createAsyncThunk("post/postnewProduct", async (data,{rejectWithValue}) => {
    try {
        const config={headers:{"Content-Type":"multipart/form-data"},withCredentials:true};
        const response = await axios.post(`https://ecommerce-plaza-aryanhac.onrender.com/api/admin/product/new`,data,config);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
// for deleting the product --admin
const deleteProduct = createAsyncThunk("delete/deleteProduct", async (id,{rejectWithValue}) => {
    try {
        const response = await axios.delete(`https://ecommerce-plaza-aryanhac.onrender.com/api/admin/product/${id}`,{withCredentials:true});
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
// for updating Product --admin
const updateProduct = createAsyncThunk("update/updateProduct", async (data,{rejectWithValue}) => {
    try {
        const config={headers:{"Content-Type":"multipart/form-data"},withCredentials:true};
        const response = await axios.put(`https://ecommerce-plaza-aryanhac.onrender.com/api/admin/product/${data.id}`,data.form,config);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
// for getting all review --admin
const getAllReviews = createAsyncThunk("get/getReviews", async (id,{rejectWithValue}) => {
    try {
        const response = await axios.get(`https://ecommerce-plaza-aryanhac.onrender.com/api/admin/reviews?product_Id=${id}`,{withCredentials:true});
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
// for deleting review --admin
const deleteReview = createAsyncThunk("delete/deleteReview", async (data,{rejectWithValue}) => {
    try {
        const response = await axios.delete(`https://ecommerce-plaza-aryanhac.onrender.com/api/admin/review/delete?product_Id=${data.product_Id}&review_Id=${data.review_Id}`,{withCredentials:true});
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});



export {
    getProducts,
    getProductDetail,
    addReview,
    getAllProducts,
    newProduct,
    deleteProduct,
    updateProduct,
    getAllReviews,
    deleteReview
};