import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../components/apis/BaseUrl";
import { ALL_PRODUCTS_MIDDLE_POINT } from "../components/apis/MiddlePoint";

const PRODUCTS_URL = BASE_URL+ALL_PRODUCTS_MIDDLE_POINT;

export const allProducts = createAsyncThunk(
    'product/allProducts',
    async(thunkAPI,{ getState }) => {
        let {companyId} = getState().company
        try{
            let response = await axios.get(PRODUCTS_URL)
            if(companyId){
                return response.data.filter(product => product.userId?.companyId?._id === companyId)
            }
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
    reducers:{
        getProductsForCompany: (state , action)=>{
            let arr = state.products?.filter(product => product.userId?.companyId?._id === action.payload)
            state.products = arr
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(allProducts.pending , (state) => {
            state.loading = true;
        })
        .addCase(allProducts.fulfilled , (state , action) =>{
            console.log(action.payload)
            state.products = action.payload;
            state.loading = false;
        })
        .addCase(allProducts.rejected , (state)=>{
            state.errror = true;
        })
    },

}) 
export  const {getProductsForCompany} = productsSlice.actions; 
export default productsSlice.reducer