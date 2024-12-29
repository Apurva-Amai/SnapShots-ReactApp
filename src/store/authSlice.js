import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userStatus: false,   // true: logged in, false: logged out 
    userData: null       // Stores user information (null if no user is logged in)
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userStatus = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.userStatus = false;
            state.userData = null;
        }
    }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;