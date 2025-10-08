import { fetchUserProfile } from '../api/userApi';
// Thunk to fetch user profile using token
export const fetchUserProfileThunk = createAsyncThunk(
    'auth/fetchUserProfile',
    async (token, { rejectWithValue }) => {
        try {
            const user = await fetchUserProfile(token);
            return user;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { setAxiosAuthHeader } from 'src/auth/utils/secure-storage';

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
    reducers: {
        setAuthFromCookie: (state, action) => {
            state.token = action.payload.token;
            state.role = action.payload.role;
            // Optionally, fetch user info here if needed
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfileThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfileThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserProfileThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
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
                setAxiosAuthHeader(action.payload.access_token);
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
                setAxiosAuthHeader(action.payload.access_token);
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
                setAxiosAuthHeader(null);
            });
    },
});

export const { setAuthFromCookie } = authSlice.actions;
export default authSlice.reducer;
