// src/features/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
  loading: false,
  error: null,
  value: 0
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 🔹 Common start
    authStart: (state) => {
      state.loading = true; 
      state.error = null;
    },

    // 🔹 Signup success (NO login here)
    signupSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },

    // 🔹 Login success
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },

    // 🔹 Fail
    authFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // 🔹 Logout
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
    //navbar
    usenavbar: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
    increment: (state) => {
      state.value += 1
    }
    ,
    decrement: (state) => {
      state.value -= 1
      if (state.value < 0) {
        state.value = 0;
      }
    },
    incrementamountpayload: (state,action) => {
      state.value += Number(  action.payload)
    },
    reset: (state) => {
      state.value = 0
    },
    user:(state)=>{
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
    uploadProfile: (state, action) => {
  state.image = action.payload; 
}


  }
});

export const {
  authStart,
  signupSuccess,
  loginSuccess,
  authFail,
  logout,
  usenavbar,
  user,
  uploadProfile,
  increment,
  decrement,
  incrementamountpayload,
  reset
} = authSlice.actions;

export default authSlice.reducer;