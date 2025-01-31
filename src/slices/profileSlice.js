import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


const initialState = {
    user: null,
    error : null,
    loading: false
}
export const imageUpload = createAsyncThunk(
    'profile/imageUpload',
    async ({ formData , token} ) => {
        try {
            let response = await axios.post(
              "http://localhost:8080/user/profile/uploadImage",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  authorization: `Bearer ${token}`
                },
              }
            );
            let image = { filename:response.data.filename, path: response.data.path}
            toast.success(`${response.data.message}`);
            return image
          } catch (err) {
            console.log(err)
            toast.error("Failed to upload file.");
          }
    }
)

export const editUser = createAsyncThunk(
    'profile/editUser' ,
    async (formData ) => {
        try{
            let response= await axios.put('http://localhost:8080/user/profile/edit',formData);
            toast.success(`${response.data.message}`)
            return response.data
          }catch(err){
            toast.error(`${err.response.data.message}`)
          }
    }
)

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder
        .addCase(imageUpload.fulfilled , (state , action) =>{
            if(state.user){
                state.user.profileImage = action.payload
            }
        })
        .addCase(editUser.fulfilled , (state , action) => {
            state.user =  action.payload.editedUser;
        })
    }
})  

export default profileSlice.reducer