import { createSlice } from "@reduxjs/toolkit";
import { loggedIn, register, loadUser, logOutUser, updateProfile, updatePassword, getAllUsers,getUserDetail,deleteUser,updateUser } from "./UserActions";



//state for user
const userSlice = createSlice({
    name: 'UserLogIn',
    initialState:{ user: [], loading: true, error: false, isAuthenticated: false,isUpdated:false },
    reducers: {
        clearError(state, action) {
            state.error = false;
        },
        changeUpdate(state,action){
            state.isUpdated=false;
        }
    },
    extraReducers: {
        //loggedIn
        [loggedIn.pending]: (state, action) => {
            state.loading = true;
        },
        [loggedIn.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.error = false;
            state.isAuthenticated = true;
        },
        [loggedIn.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //LoadUser
        [loadUser.pending]: (state, action) => {
            state.loading = true;
        },
        [loadUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.error = false;
            state.isAuthenticated = true;
        },
        [loadUser.rejected]: (state, action) => {
            state.isAuthenticated=false;
            state.loading = false;
            state.error = false;
        },
        //Register
        [register.pending]: (state, action) => {
            state.loading = true;
        },
        [register.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.error = false;
            state.isAuthenticated = true;

        },
        [register.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //Logout
        [logOutUser.pending]: (state, action) => {
            state.loading = true;
        },
        [logOutUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = null;
            state.error = false;
            state.isAuthenticated = false;
        },
        [logOutUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //updateProfile
        [updateProfile.pending]: (state, action) => {
            state.loading = true;
        },
        [updateProfile.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.error = false;
            state.isAuthenticated = true;
            state.isUpdated=true;
        },
        [updateProfile.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //updatePassword
        [updatePassword.pending]: (state, action) => {
            state.loading = true;
        },
        [updatePassword.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.error = false;
            state.isAuthenticated = true;
            state.isUpdated=true;
        },
        [updatePassword.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }

    }
});

//state for users ---- admin
const usersSlice = createSlice({
    name: 'Users',
    initialState:{ users: [], loading: true, error: false,isUpdated:false,isDeleted:false },
    reducers: {
        clearError(state, action) {
            state.error = false;
        },
        clearSuccess(state,action){
            state.isUpdated=false;
            state.isDeleted=false;
        }
    },
    extraReducers: {
        //Users
        [getAllUsers.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllUsers.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = action.payload.users;
            state.error = false;   
        },
        [getAllUsers.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //userDetail
        [getUserDetail.pending]: (state, action) => {
            state.loading = true;
        },
        [getUserDetail.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = action.payload.user;
            state.error = false;
        },
        [getUserDetail.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //Delete
        [deleteUser.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = false;
            state.isDeleted=true;

        },
        [deleteUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //update
        [updateUser.pending]: (state, action) => {
            state.loading = true;
        },
        [updateUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = false;
            state.isUpdated=true
        },
        [updateUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

    }
});

const userActions = userSlice.actions;
const usersActions=usersSlice.actions;
export { userSlice, userActions,usersActions,usersSlice };