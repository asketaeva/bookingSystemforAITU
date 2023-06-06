import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AUTH_TOKEN, REFRESH_TOKEN } from './constants';
import AuthService from '../services/AuthService';

export const initialState = {
    loading: false,
    message: '',
    err: '',
    isEmailExist: true,
    showMessage: false,
    redirect: '',
    token: localStorage.getItem(AUTH_TOKEN) || null,
    userData: {},
};

export function parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );

    return JSON.parse(jsonPayload);
}

export const login = createAsyncThunk(
    'auth/login',
    async (data, { rejectWithValue }) => {
        const { email, password } = data;

        try {
            const response = await AuthService.login(email, password);
            if (response.data) {
                const token = response.data.token.access;
                localStorage.setItem(AUTH_TOKEN, response.data.token.access);
                localStorage.setItem(
                    REFRESH_TOKEN,
                    response.data.token.refresh
                );
                let payload = { data: await parseJwt(token), token };
                return payload;
            } else {
                console.log(
                    'rejectWithValue(response)',
                    rejectWithValue(response)
                );
                return rejectWithValue(response);
            }
        } catch (e) {
            console.log('e.response.data', e.response.data.error);
            return rejectWithValue(e.response.data.error);
        }
    }
);
export const refreshTokenAccess = createAsyncThunk(
    '/auth/refresh/',
    async (data, { rejectWithValue }) => {
        const { refresh } = data;
        // const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const response = await AuthService.refreshToken(refresh);
            if (response.data) {
                const token = response.data.access;
                localStorage.setItem(AUTH_TOKEN, token);
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
                let payload = { data: await parseJwt(token), token };
                return payload;
            } else {
                console.log('REFRESH_RESPONSE', response);
                return response;
            }
        } catch (err) {
            throw new Error('Refresh token failed');
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (data, { rejectWithValue }) => {
        const {
            email,
            password,
            fio,
            is_staff,
            group_id,
            instructor_id,
            code,
        } = data;

        try {
            const response = await AuthService.register(
                email,
                password,
                fio,
                is_staff,
                group_id,
                instructor_id,
                code
            );
            console.log('RESPONSEDATA', response);
            if (response.data.token) {
                const access = response.data.token.access;
                const refresh = response.data.token.refresh;

                localStorage.setItem('AUTH_TOKEN', access);
                localStorage.setItem('REFRESH_TOKEN', refresh);

                const payload = {
                    data: await parseJwt(access),
                    token: access,
                };

                return payload;
            }
            return response;
        } catch (e) {
            return rejectWithValue(e.response.data.error);
        }
    }
);

export const signOut = createAsyncThunk('auth/signOut', async () => {
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        showAuthMessage: (state, action) => {
            state.message = action.payload;
            state.showMessage = true;
            state.loading = false;
        },
        hideAuthMessage: (state) => {
            state.message = '';
            state.showMessage = false;
        },
        showLoading: (state) => {
            state.loading = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.redirect = '/';
                state.token = action.payload.token;
                state.userData = action.payload.data;
            })
            .addCase(login.rejected, (state, action) => {
                state.message = action.payload;
                state.showMessage = true;
                state.loading = false;
            })
            .addCase(refreshTokenAccess.fulfilled, (state) => {
                state.isAuthenticated = true;
                state.loading = false;
            })
            .addCase(refreshTokenAccess.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.loading = false;
                state.token = action.payload;
            })
            .addCase(signOut.fulfilled, (state) => {
                state.loading = false;
                state.token = null;
                state.redirect = '/';
            })
            .addCase(signOut.rejected, (state) => {
                state.loading = false;
                state.token = null;
                state.redirect = '/';
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.redirect = '/';
                state.token = action.payload;
                state.isEmailExist = action.payload.data.is_email_exist;
            })
            .addCase(register.rejected, (state, action) => {
                state.message = action.payload;
                state.showMessage = true;
                state.loading = false;
            });
    },
});

export const { showAuthMessage, hideAuthMessage, showLoading } =
    authSlice.actions;

export default authSlice.reducer;
