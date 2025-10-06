
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { logout, adminLogin, employeeLogin } from '../api/authApi';
import { setAuthCookies, clearAuthCookies } from '../utils/cookie';

const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
    role: null, // 'admin' or 'employee'
};

export const adminLoginThunk = createAsyncThunk(
    'auth/adminLogin',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await adminLogin(payload);
            return response;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const employeeLoginThunk = createAsyncThunk(
    'auth/employeeLogin',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await employeeLogin(payload);
            return response;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const logoutThunk = createAsyncThunk(
    'auth/logout',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().auth;
            await logout(token);
            return null;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adminLoginThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(adminLoginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.access_token;
                state.role = 'admin';
                setAuthCookies(action.payload.access_token, 'admin');
            })
            .addCase(adminLoginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(employeeLoginThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(employeeLoginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.access_token;
                state.role = 'employee';
                setAuthCookies(action.payload.access_token, 'employee');
            })
            .addCase(employeeLoginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logoutThunk.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.role = null;
                clearAuthCookies();
            });
    },
});

export default authSlice.reducer;
