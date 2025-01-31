import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from '../components/apis/BaseUrl'
import {USER_MIDDLE_POINT} from '../components/apis/MiddlePoint'
import {USER_LOGIN_POST_END_POINT, USER_SIGNUP_POST_END_POINT} from '../components/apis/EndPoint'
import { toast } from 'react-toastify';

const initialState = {
  signUp:false,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  user:null
};


export const signUpUser = createAsyncThunk(
  'auth/signupUser',
  async(formData , thunkAPI )=>{ 
    try{
      let response = await axios.post(BASE_URL+USER_MIDDLE_POINT+USER_SIGNUP_POST_END_POINT , formData,{
        headers: {
          "Content-Type": "multipart/form-data"
        }});
      // useNavigate()("/login")
      toast.success(response.data.message)
      return response.data
    }catch(error){
      console.log(error)
      toast.error(error.response?.data?.error || "signUp failed")
      return thunkAPI.rejectWithValue(error.response?.data?.error || 'Something went wrong');
    }
  }
)

export const  loginUser =  createAsyncThunk(
  'auth/loginUser',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(BASE_URL+USER_MIDDLE_POINT+USER_LOGIN_POST_END_POINT, formData);
      return response.data; // Return user data
    } catch (error) {
      toast.error(`${error.response?.data?.error}`)
      return thunkAPI.rejectWithValue(error.response?.data?.error || 'Something went wrong');
    }
  }
);

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
    loginWithGoogle: (state, action)=>{
      state.token = action.payload.credential,
      state.isAuthenticated = true;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase( signUpUser.pending , (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(signUpUser.fulfilled, (state) => {
      state.loading = false;
      state.signUp = true;
      // state.isAuthenticated = true;
    })
    .addCase(signUpUser.rejected, (state) => {
      state.loading = false;
      // state.error = action.payload
      // console.log(action)
    })
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
      });
  },
});

export const { logout , loginWithGoogle } = authSlice.actions;

export default authSlice.reducer;