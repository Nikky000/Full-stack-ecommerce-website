import { createSlice } from "@reduxjs/toolkit";
import { getProducts, getProductDetail, addReview,getAllProducts,newProduct,deleteProduct,updateProduct, getAllReviews, deleteReview } from "./ProductActions";


//state for all product
const productSlice = createSlice({
    name: 'Products',
    initialState: { products: [], loading: true, error: false,success:false },
    reducers: {
        clearError: (state, action) => {
            state.error = false;
        },
        clearSuccess:(state,action)=>{
            state.success=false;
        }
    },
    extraReducers: {
        [getProducts.pending]: (state, action) => {
            state.loading = true;
        },
        [getProducts.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload.products;
            state.totalProduct = action.payload.totalProduct;
            state.productPerPage = action.payload.resultPerPage;
            state.totalFilterProduct = action.payload.totalFilterProduct;
            state.error = false;
        },
        [getProducts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getAllProducts.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllProducts.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload.products;
            state.error=false;
        },
        [getAllProducts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    }
});

//state for particular product
const productDetailSlice = createSlice({
    name: 'Product',
    initialState: { product: {}, loading: true, error: false },
    reducers: {
        clearError: (state, action) => {
            state.error = false;
        }
    },
    extraReducers: {
        [getProductDetail.pending]: (state, action) => {
            state.loading = true;
        },
        [getProductDetail.fulfilled]: (state, action) => {
            state.loading = false;
            state.product = action.payload.product;
            state.error = false;
        },
        [getProductDetail.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        }
    }
});

//state for review of the product
const reviewSlice = createSlice({
    name: 'Reviews',
    initialState: { reviewAdded:false, loading: true, reviewError: false },
    reducers: {
        clearError: (state, action) => {
            state.reviewError = false;
        },
        clearReview:(state,action)=>{
            state.reviewAdded=false;
        }
    },
    extraReducers: {
        [addReview.pending]: (state, action) => {
            state.loading = true;
        },
        [addReview.fulfilled]: (state, action) => {
            state.loading = false;
            state.reviewAdded=true;
            state.reviewError = false;
        },
        [addReview.rejected]: (state, action) => {
            state.loading = false;
            state.reviewError = action.payload.message;
        }
    }
});
//creating new Product reducer
const newProductSlice = createSlice({
    name: 'CreateProduct',
    initialState: { product: {}, loading: true, error: false,success:false },
    reducers: {
        clearError: (state, action) => {
            state.error = false;
        },
        clearSuccess:(state,action)=>{
            state.success=false;
        }
    },
    extraReducers: {
        [newProduct.pending]: (state, action) => {
            state.loading = true;
        },
        [newProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload.product;
            state.error=false;
            state.success=true;
        },
        [newProduct.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [updateProduct.pending]: (state, action) => {
            state.loading = true;
        },
        [updateProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload.product;
            state.error=false;
            state.success=true;
        },
        [updateProduct.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    }
});

//Delete Product reducer
const deleteProductSlice = createSlice({
    name: 'DeleteProduct',
    initialState: { product: {}, loading: true, deleteError: false,deleteSuccess:false },
    reducers: {
        clearError: (state, action) => {
            state.deleteError = false;
        },
        clearSuccess:(state,action)=>{
            state.deleteSuccess=false;
        }
    },
    extraReducers: {
        [deleteProduct.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload.product;
            state.deleteError=false;
            state.deleteSuccess=true;
        },
        [deleteProduct.rejected]: (state, action) => {
            state.loading = false;
            state.deleteError = action.payload.message;
        },
    }
});
// Product Reviews reducer --admin
const reviewsSlice = createSlice({
    name: 'Reviews',
    initialState: { reviews: [], loading: true, isDeleted:false, error:false },
    reducers: {
        clearError: (state, action) => {
            state.error = false;
        },
        clearSuccess:(state,action)=>{
            state.isDeleted=false;
        },
        clearReviews:(state,action)=>{
            state.reviews=[];
        }
    },
    extraReducers: {
        [getAllReviews.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllReviews.fulfilled]: (state, action) => {
            state.loading = false;
            state.reviews = action.payload.reviews;
        },
        [getAllReviews.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [deleteReview.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteReview.fulfilled]: (state, action) => {
            state.loading = false;
            state.isDeleted=true;
        },
        [deleteReview.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    }
});


const productAction = productSlice.actions;
const productDetailAction = productDetailSlice.actions;
const reviewAction = reviewSlice.actions; 
const newProductAction=newProductSlice.actions;
const deleteProductAction=deleteProductSlice.actions;
const reviewsAction= reviewsSlice.actions



export {
    productSlice,
    productDetailSlice,
    productAction,
    productDetailAction,
    reviewAction,
    reviewSlice,
    newProductSlice,
    newProductAction,
    deleteProductSlice,
    deleteProductAction,
    reviewsAction,
    reviewsSlice
};