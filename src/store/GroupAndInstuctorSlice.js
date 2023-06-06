import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserService from '../services/UserService';

let initialState = {
    group: {},
    instructor: {},
    isLoading: true,
    error: '',
};

export const getGroup = createAsyncThunk(
    'groupOrInstructor/getGroup',
    async () => {
        try {
            const response = await UserService.group();
            return response;
        } catch (e) {
            console.error(e);
        }
    }
);

export const getInstructor = createAsyncThunk(
    'groupOrInstructor/getInstructor',
    async () => {
        try {
            const response = await UserService.instructor();
            console.log('RESPONSE', response);
            return response;
        } catch (e) {
            console.error(e);
        }
    }
);

export const groupAndInstructor = createSlice({
    name: 'groupOrInstructor',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getGroup.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getGroup.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.group = action.payload;
        });
        builder.addCase(getGroup.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.group = [];
        });
        builder.addCase(getInstructor.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getInstructor.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.instructor = action.payload;
        });
        builder.addCase(getInstructor.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.instructor = [];
        });
    },
});

export const { group, instructor } = groupAndInstructor.actions;

export default groupAndInstructor.reducer;
