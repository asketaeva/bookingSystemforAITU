import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserService from '../services/UserService';

let initialState = {
    user: {},
    isLoading: true,
    error: '',
};

export const getUser = createAsyncThunk('user/getUser', async () => {
    try {
        const response = await UserService.get_user_info();
        return response;
    } catch (e) {
        console.error(e);
    }
});

export const UserInfoSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.user = action.payload;
        });
        builder.addCase(getUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.user = [];
        });
    },
});

export const { user } = UserInfoSlice.actions;

export default UserInfoSlice.reducer;
