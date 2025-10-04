"use client";

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Tab, Tabs, Alert, Paper, Button, TextField, Typography } from '@mui/material';

import { adminLoginThunk, employeeLoginThunk } from 'src/redux/slices/authSlice';

export default function JwtLoginView() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const [role, setRole] = useState('admin');
    const [form, setForm] = useState({ email: '', code: '', password: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRoleChange = (event, newValue) => {
        setRole(newValue);
        setForm({ email: '', code: '', password: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (role === 'admin') {
            dispatch(adminLoginThunk({ email: form.email, password: form.password }));
        } else {
            dispatch(employeeLoginThunk({ code: form.code, password: form.password }));
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #e0e7ff 0%, #f5f7fa 100%)' }}>
            <Paper elevation={6} sx={{ p: 4, borderRadius: 4, minWidth: 350, maxWidth: 400 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Welcome Back
                </Typography>
                <Tabs value={role} onChange={handleRoleChange} centered sx={{ mb: 3 }}>
                    <Tab label="Admin" value="admin" />
                    <Tab label="Employee" value="employee" />
                </Tabs>
                <form onSubmit={handleSubmit}>
                    {role === 'admin' ? (
                        <TextField
                            label="Email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            type="email"
                            required
                        />
                    ) : (
                        <TextField
                            label="Employee Code"
                            name="code"
                            value={form.code}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                    )}
                    <TextField
                        label="Password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        type="password"
                        required
                    />
                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {typeof error === 'string' ? error : 'Login failed. Please try again.'}
                        </Alert>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 3, py: 1.5, fontWeight: 600, fontSize: '1rem' }}
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}
