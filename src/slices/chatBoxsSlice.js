import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BASE_URL } from '../components/apis/BaseUrl';
import { CHAT_BOX_END_POINT } from '../components/apis/EndPoint';
import axios from 'axios';

export const fetchChatbox = createAsyncThunk("chatbox/fetchChatbox", async (data, thunkApi) => {
    try {

        const URL = BASE_URL + CHAT_BOX_END_POINT;
        const response = await axios.post(URL , { data });
        console.log("chatbox response", response)
        return response.data;
    } catch (error) {
        console.log(error)
        return thunkApi.rejectWithValue('error')
    }
});

const chatBoxSlice = createSlice({
    name: 'chatbox',
    initialState: {
        chats: [],
        loading: false,
        error: false
    },

    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(fetchChatbox.pending, (state) => {
            state.error = false;
            state.loading = true;
        });
        builder.addCase(fetchChatbox.fulfilled, (state, action) => {
            console.log(action.payload.response)
            state.loading = false;
            state.chats = action.payload.response;
        });
        builder.addCase(fetchChatbox.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });


    },
});


export default chatBoxSlice.reducer;