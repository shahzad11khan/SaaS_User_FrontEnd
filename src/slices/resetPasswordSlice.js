import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../components/apis/BaseUrl";
import { USER_MIDDLE_POINT } from '../components/apis/MiddlePoint'
import { USER_FORGOT_EMAIL , USER_RESET_PASSWORD, USER_VERIFY_OTP } from '../components/apis/EndPoint'
import { toast } from "react-toastify";


const URL_EMAIL = BASE_URL+USER_MIDDLE_POINT+USER_FORGOT_EMAIL;
const URL_OTP = BASE_URL+USER_MIDDLE_POINT+USER_VERIFY_OTP;
const URL_PASSWORD = BASE_URL+USER_MIDDLE_POINT+USER_RESET_PASSWORD;

export const emailSearch =createAsyncThunk(
    "reset/emailSearch",
     async( formData , thunkAPI)=>{
    try{
    let response = await axios.post(URL_EMAIL ,formData)
    let url = response.data.resetURL.split('/')[4]
    toast.success(response.data.message)
    return url
    }catch(err){
      console.log(err)
      toast.error(`${err?.response?.data?.message} `)
      return thunkAPI.rejectWithValue(err || 'somthing went wrong')
    }
  }
)

export const OTPVerify = createAsyncThunk(
    'resetPassword/OTPVerify',
    async(formData , thunkAPI)=>{
        try{
            let response = await axios.post(URL_OTP ,formData);
            console.log( response)
            toast.success(response.data.message)
            // if(response){
            //   setView(view+1)
            // }
            return
          }catch(error){
            console.log(error)
            toast.error(`${error?.response?.data?.message}`)  
            return thunkAPI.rejectWithValue(error || 'somthing went wrong')
          }
    }
)

export const setNewPassword = createAsyncThunk(
    'resetPassword/setNewPassword',
    async(formData , thunkAPI)=>{
        try{
            let response = await axios.post(URL_PASSWORD , formData)
            console.log(response.data)
            toast.success(response.data.message)
            // setReset(!reset)
            return
          }catch(error){
            console.log(err)
            // setError(`${err.response.data.message}`)
            toast.error(`${error?.response?.data?.message}`)              
            return thunkAPI.rejectWithValue(error || 'somthing went wrong')
          }
    }
)


const initialState = {
    loading:null,
    errror: null,
    refToken:null,
    success:null,
    view:0,
}

const resetPasswordSlice = createSlice({
    initialState,
    name: "resetPassword",
    reducers:{
        previousView :(state)=>{
            state.view -= 1
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(emailSearch.pending , (state) => {
            state.loading = true;
        })
        .addCase(emailSearch.fulfilled , (state , action) =>{
            state.refToken = action.payload;
            state.view += 1 
            state.loading = false;
        })
        .addCase(emailSearch.rejected , (state)=>{
            state.errror = true;
            state.loading = false;
        })
        .addCase(OTPVerify.pending , (state) => {
            state.loading = true;
        })
        .addCase(OTPVerify.fulfilled , (state ) =>{
            state.view += 1 
            state.loading = false;
        })
        .addCase(OTPVerify.rejected , (state)=>{
            state.errror = true;
            state.loading = false;
        })
        .addCase(setNewPassword.pending , (state) => {
            state.loading = true;
        })
        .addCase(setNewPassword.fulfilled , (state ) =>{
            state.view += 1 
            state.loading = false;
        })
        .addCase(setNewPassword.rejected , (state)=>{
            state.errror = true;
            state.loading = false;
        })
    },

}) 

export const {previousView } = resetPasswordSlice.actions
export default resetPasswordSlice.reducer