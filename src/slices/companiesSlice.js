import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from '../components/apis/BaseUrl'
import {COMPANIES_MIDDLE_POINT} from '../components/apis/MiddlePoint'

const initialState = {
  allCompanies:null,
  loading: false,
  error: true,
  companyId : null,
};


export const getAllCompanies = createAsyncThunk(
  'comapny/allCompnaies',
  async(_ , thunkAPI )=>{ 
    try{
      let response = await axios.get(BASE_URL + COMPANIES_MIDDLE_POINT);
      return response.data.companies
    }catch(error){
      console.log(error)
      return thunkAPI.rejectWithValue(error.response?.data?.error || 'Something went wrong');
    }
  }
)


const companiesSlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    selectedCompany: (state , action)=>{
      console.log(action.payload)
        state.companyId = action.payload._id;
    }
  },
  extraReducers:(builder) =>{
    builder
    .addCase(getAllCompanies.pending , (state)=>{
        state.loading = true;
    })
    .addCase(getAllCompanies.fulfilled , (state , action)=>{
        state.allCompanies = action.payload
        state.loading = false;
    })
    .addCase(getAllCompanies.rejected , (state)=>{
        state.error = true
        state.loading = false;
    })
  },
});

export const {selectedCompany} = companiesSlice.actions;

export default companiesSlice.reducer;