import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../components/apis/BaseUrl";
import { ALL_PRODUCTS_MIDDLE_POINT } from "../components/apis/MiddlePoint";

const PRODUCTS_URL = BASE_URL+ALL_PRODUCTS_MIDDLE_POINT;

export const allProducts = createAsyncThunk(
    'product/allProducts',
    async(thunkAPI) => {
        try{
            let response = await axios.get(PRODUCTS_URL)
            return response.data
        }
        catch(error){
            console.log(err)
            return thunkAPI.rejectWithValue( error.response.data || "somthing went wrong")
        }
    }
)

const initialState = {
    loading:null,
    errror: null,
    products: null,
}

const productsSlice = createSlice({
    initialState,
    name: "product",
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(allProducts.pending , (state) => {
            state.loading = true;
        })
        .addCase(allProducts.fulfilled , (state , action) =>{
            state.products = action.payload;
            state.loading = false;
        })
        .addCase(allProducts.rejected , (state)=>{
            state.errror = true;
        })
    },

}) 

export default productsSlice.reducer