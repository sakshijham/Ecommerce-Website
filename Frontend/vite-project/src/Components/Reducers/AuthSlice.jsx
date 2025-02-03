import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   isLoggedIn : false,
   token : localStorage.getItem('token'),
   email : localStorage.getItem('email'),
   userId : localStorage.getItem('userId')
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginHandler(state) {
           state.isLoggedIn = true ;
        },
      
        
        logoutHandler(state) {
            // localStorage.removeItem('token');
            // localStorage.removeItem('email');
            // localStorage.removeItem('role')
            
            state.isLoggedIn = false
        },
    },
});

export const { loginHandler,logoutHandler } = authSlice.actions;

export default authSlice.reducer;