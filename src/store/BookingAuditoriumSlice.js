import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuditoriumService from '../services/Services';

export const initialState = {
    isLoad: false,
    error: '',
    bookAuditorium: {},
};

export const bookAuditorium = createAsyncThunk(
    'bookAuditorium/bookAuditoriumPost',
    async (data, { rejectWithValue }) => {
        const { reason, date, datetime_from, datetime_to, auditoriumID } = data;

        try {
            const response = await AuditoriumService.book_auditorium_post(
                reason,
                date,
                datetime_from,
                datetime_to,
                auditoriumID
            );

            if (response.data) {
                const { auditorium_schedule } = response.data;
                const extractedData = [];

                auditorium_schedule.map((scheduleEntry) => {
                    const {
                        groups,
                        subject_name,
                        instructor_name,
                        auditorium_day_date_end,
                        auditorium_day_date_begin,
                    } = scheduleEntry;

                    groups.forEach((group) => {
                        const { group_id, group_name } = group;

                        extractedData.push({
                            group_id,
                            group_name,
                            subject_name,
                            instructor_name,
                            auditorium_day_date_end,
                            auditorium_day_date_begin,
                        });
                    });
                });

                return extractedData;
            }
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
);

export const bookAuditoriumSlice = createSlice({
    name: 'bookAuditorium',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(bookAuditorium.pending, (state) => {
                state.isLoad = true;
                state.error = null;
            })
            .addCase(bookAuditorium.fulfilled, (state, action) => {
                state.isLoad = false;
                state.error = null;
                state.bookAuditorium = action.payload;
            })
            .addCase(bookAuditorium.rejected, (state, action) => {
                state.isLoad = false;
                state.error = action.payload;
            });
    },
});

export default bookAuditoriumSlice.reducer;
