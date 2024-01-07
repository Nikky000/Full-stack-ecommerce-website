import { createSlice } from "@reduxjs/toolkit"
import {createNewOrder,getAllOrders,getOrder,getOrdersList,updateOrder,deleteOrder} from './MyOrderAction'

//for creating new Order
const orderSlice=createSlice({
    name:'createOrder',
    initialState:{loading:true,isPlaced:false,error:false,order:{}},
    reducers:{
        clearError:(state,action)=>{
            state.error=false;
        },
        clearPlaced:(state,action)=>{
            state.isPlaced=false;
        }
    },
    extraReducers:{
       [createNewOrder.pending]:(state,action)=>{
           state.loading=true;
           state.isPlaced=false;
       },
       [createNewOrder.fulfilled]:(state,action)=>{
          state.order=action.payload;
          state.loading=false;
          state.error=false;
          state.isPlaced=true;
       },
       [createNewOrder.rejected]:(state,action)=>{
           state.loading=false;
           state.isPlaced=false;
           state.error=action.payload;
       }
    }
});

//state for All Orders
const allOrderSlice = createSlice({
    name: 'Orders',
    initialState: { orders: [], loading: true, error: false },
    reducers: {
        clearError: (state, action) => {
            state.error = false;
        },
    },
    extraReducers: {
        [getAllOrders.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllOrders.fulfilled]: (state, action) => {
            state.orders = action.payload;
            state.loading = false;
            state.error = false;
        },
        [getAllOrders.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

//state for particular Order
const particularOrderSlice = createSlice({
    name: 'Order',
    initialState: { loading: true, error: false,order:{} },
    reducers: {
        clearError: (state, action) => {
            state.error = false;
        },
    },
    extraReducers: {
        [getOrder.pending]: (state, action) => {
            state.loading = true;
        },
        [getOrder.fulfilled]: (state, action) => {
            state.order = action.payload;
            state.loading = false;
            state.error = false;
        },
        [getOrder.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

// orders list for admin
const ordersListSlice = createSlice({
    name: 'OrdersList',
    initialState: { orders: [], loading: true, error: false,updateSuccess:false,deleteSuccess:false,updateError:false},
    reducers: {
        clearError: (state, action) => {
            state.error = false;
            state.updateError=false;
        },
        clearSuccess:(state,action)=>{
            state.updateSuccess=false;
            state.deleteSuccess=false;
        }
    },
    extraReducers: {
        //admin
        [getOrdersList.pending]: (state, action) => {
            state.loading = true;
        },
        [getOrdersList.fulfilled]: (state, action) => {
            state.orders = action.payload.orders;
            state.totalAmount=action.payload.totalAmount;
            state.loading = false;
            state.error = false;
        },
        [getOrdersList.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [deleteOrder.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteOrder.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = false;
            state.deleteSuccess=true;
        },
        [deleteOrder.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [updateOrder.pending]: (state, action) => {
            state.loading = true;
        },
        [updateOrder.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = false;
            state.updateSuccess=true;
        },
        [updateOrder.rejected]: (state, action) => {
            state.loading = false;
            state.updateError = action.payload;
        },
    }
});


const orderAction=orderSlice.actions
const allOrderAction = allOrderSlice.actions
const particularOrderAction=particularOrderSlice.actions
const ordersListAction=ordersListSlice.actions

export {orderSlice,orderAction, allOrderSlice, allOrderAction,particularOrderAction,particularOrderSlice,ordersListAction,ordersListSlice}