import {configureStore} from '@reduxjs/toolkit';
import {productSlice,productDetailSlice,reviewSlice,newProductSlice,deleteProductSlice,reviewsSlice} from './ProductReducer';
import { userSlice,usersSlice} from './UserReducer';
import { cartSlice } from './CartReducer';
import { orderSlice, allOrderSlice,particularOrderSlice,ordersListSlice } from './MyOrderReducer';

const store = configureStore({
    reducer:{
        product:productSlice.reducer,
        productDetail:productDetailSlice.reducer,
        user:userSlice.reducer,
        cart:cartSlice.reducer,
        order:orderSlice.reducer,
        myOrders:allOrderSlice.reducer,
        particularOrder:particularOrderSlice.reducer,
        review:reviewSlice.reducer,
        deleteProduct:deleteProductSlice.reducer,
        newProduct:newProductSlice.reducer,
        ordersList:ordersListSlice.reducer,
        users:usersSlice.reducer,
        reviews:reviewsSlice.reducer
    }
});
export default store;