import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// for add to the cart
const addToCart = createAsyncThunk("add/addToCart", async (data,{rejectWithValue}) => {
    try {
        const response = await axios.get(`https://ecommerce-plaza-aryanhac.onrender.com/api/product/${data.id}`);
        response.data.product.quantity=data.quantity;
        return response.data.product;
    }catch(error) {
        return rejectWithValue(error.response.data.message);
    }
});
export {addToCart};