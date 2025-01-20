import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  user:null
};

export const  loginUser =  createAsyncThunk(
  'auth/loginUser',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:8080/user/auth/login', formData);
      // localStorage.setItem('token', response.data.token); // Store token in localStorage
      return response.data; // Return user data
    } catch (error) {
      // Reject with a custom error message
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);

export const signUpUser = createAsyncThunk(
  'auth/signupUser',
  async(formData , thunkAPI )=>{
    try{
    let response = await axios.post('http://localhost:8080/user/auth/signup' , formData);
    // localStorage.setItem('token',response.data.token);
    return response.data
    }catch(error){
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase( signUpUser.pending , (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
        console.log(action)
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;