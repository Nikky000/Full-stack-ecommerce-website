import { createSlice } from "@reduxjs/toolkit"
import {addToCart} from './CartAction'

//state adding to the cart
const cartSlice=createSlice({
    name:'Cart',
    initialState:{cartItems:localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[],shippingInfo:localStorage.getItem('shipInfo')?JSON.parse(localStorage.getItem('shipInfo')):{},loading:true,error:false,isAdded:false},
    reducers:{
        clearError:(state,action)=>{
            state.error=false;
        },
        clearAdded:(state,action)=>{
            state.isAdded=false;
        },
        clearItem:(state,action)=>{
            const item=state.cartItems.filter((item)=>{return item.product_id!==action.payload});
            localStorage.setItem('cartItems',JSON.stringify(item));
            state.cartItems=item;
        },
        saveShippingInfo:(state,action)=>{
           localStorage.setItem('shipInfo',JSON.stringify(action.payload));
           state.shippingInfo=action.payload;
        }
    },
    extraReducers:{
       [addToCart.pending]:(state,action)=>{
           state.loading=true;
       },
       [addToCart.fulfilled]:(state,action)=>{
         const item={
            product_id:action.payload._id,
            quantity:action.payload.quantity,
            image:action.payload.images[0].url,
            stock:action.payload.stock,
            price:action.payload.price,
            name:action.payload.name
        };
         const isItemExist= state.cartItems.find((i)=> i.product_id===item.product_id);
         if(isItemExist){
               state.loading=false;
               state.cartItems=state.cartItems.map((i)=>{ return i.product_id===item.product_id?item:i});
               state.isAdded=true;
         }else{
            state.loading=false;
            state.cartItems=[...state.cartItems,item];
            state.isAdded=true;
         }
       },
       [addToCart.rejected]:(state,action)=>{
           state.loading=false;
           state.error=action.payload;
       }
    }
});

const cartAction=cartSlice.actions
export {cartSlice,cartAction}