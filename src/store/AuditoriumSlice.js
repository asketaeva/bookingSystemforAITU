import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuditoriumService from '../services/Services';

let initialState = {
    auditorium: {},
    auditoriumSchedule: {},
    isLoading: true,
    error: '',
};

export const getAuditorium = createAsyncThunk(
    'auditorium/getAuditorium',
    async () => {
        try {
            const response = await AuditoriumService.get_auditorium();
            return response;
        } catch (e) {
            console.error(e);
        }
    }
);

export const getAuditoriumSchedule = createAsyncThunk(
    'auditorium/getAuditoriumSchedule',
    async ({ auditoriumID, date }, { rejectWithValue }) => {
        try {
            const response = await AuditoriumService.get_auditorium_schedule(
                auditoriumID,
                date
            );
            console.log('RESPONSE', response);
            return response;
        } catch (e) {
            return rejectWithValue('Неправильный логин или пароль');
        }
    }
);

export const auditoriumsSlice = createSlice({
    name: 'auditoriums',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAuditorium.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAuditorium.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.auditorium = action.payload;
        });
        builder.addCase(getAuditorium.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.auditorium = [];
        });
        builder.addCase(getAuditoriumSchedule.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAuditoriumSchedule.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.auditoriumSchedule = action.payload;
        });
        builder.addCase(getAuditoriumSchedule.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.auditoriumSchedule = [];
        });
    },
});

export const { auditorium, auditoriumSchedule } = auditoriumsSlice.actions;

export default auditoriumsSlice.reducer;
