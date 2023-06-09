import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import HistoryService from '../services/HistoryService';

let initialState = {
    requests: {},
    status: {},
    statusConfigs: {},
    showMessage: false,
    isLoading: true,
    error: '',
};

export const changeStatusConfigs = createAsyncThunk(
    'requests/changeStatusConfigs',
    async ({ request_status_config_id }, { rejectWithValue }) => {
        try {
            const response = await HistoryService.post_change_status_configs(
                request_status_config_id
            );

            if (response.data) {
                return response.data;
            }
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
);

export const getRequestStatusConfigs = createAsyncThunk(
    'requests/getRequestStatusConfigs',
    async () => {
        try {
            const response = await HistoryService.get_request_status_configs();
            return response;
        } catch (e) {
            console.error(e);
        }
    }
);

export const approveRequestPost = createAsyncThunk(
    'requests/approveRequest',
    async (
        { booking_request_id, booking_request_status_id, reason_for_refuse },
        { rejectWithValue }
    ) => {
        try {
            const response = await HistoryService.approve_request_post(
                booking_request_id,
                booking_request_status_id,
                reason_for_refuse
            );

            if (response.data) {
                return response.data;
            }
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
);

export const getStatus = createAsyncThunk('requests/getStatus', async () => {
    try {
        const response = await HistoryService.get_status();
        return response;
    } catch (e) {
        console.error(e);
    }
});

export const getRequests = createAsyncThunk(
    'requests/getRequests',
    async () => {
        try {
            const response = await HistoryService.get_requests();
            return response;
        } catch (e) {
            console.error(e);
        }
    }
);

export const requestsSlice = createSlice({
    name: 'requests',
    initialState,
    reducers: {
        showMessage: (state, action) => {
            state.error = action.payload;
            state.showMessage = true;
            state.isLoading = false;
        },
        hideMessage: (state) => {
            state.error = '';
            state.showMessage = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRequestStatusConfigs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRequestStatusConfigs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = '';
                state.statusConfigs = action.payload;
            })
            .addCase(getRequestStatusConfigs.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getRequests.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRequests.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = '';
                state.requests = action.payload;
            })
            .addCase(getRequests.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = '';
                state.status = action.payload;
            })
            .addCase(getStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(approveRequestPost.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(approveRequestPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.approveRequestPost = action.payload;
            })
            .addCase(approveRequestPost.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(changeStatusConfigs.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(changeStatusConfigs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.changeStatusConfigs = action.payload;
            })
            .addCase(changeStatusConfigs.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { requests, status, hideMessage, showMessage, statusConfigs } =
    requestsSlice.actions;

export default requestsSlice.reducer;
