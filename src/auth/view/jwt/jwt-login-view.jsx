"use client";

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Tab, Tabs, Alert, Paper, Button, TextField, Typography } from '@mui/material';

import { adminLoginThunk, employeeLoginThunk } from 'src/redux/slices/authSlice';

export default function JwtLoginView() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const [loginRole, setLoginRole] = useState('admin');
    const [form, setForm] = useState({ email: '', code: '', password: '' });

    // Remove automatic redirect on mount to prevent loops
    // Let the GuestGuard handle redirects based on authentication state

    // Remove Redux-based redirect logic to prevent conflicts
    // Let GuestGuard handle redirects based on AuthProvider state

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRoleChange = (event, newValue) => {
        setLoginRole(newValue);
        setForm({ email: '', code: '', password: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loginRole === 'admin') {
            dispatch(adminLoginThunk({ email: form.email, password: form.password }));
        } else {
            dispatch(employeeLoginThunk({ code: form.code, password: form.password }));
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            background: 'linear-gradient(120deg, #e0e7ff 0%, #f5f7fa 100%)',
        }}>
            {/* Highly visible background block and SVG */}
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                pointerEvents: 'none',
            }}>
                <svg width="100%" height="100%" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 0, left: 0 }}>
                    <rect x="0" y="0" width="1440" height="900" fill="#e0e7ff" opacity="0.35" />
                    <ellipse cx="720" cy="450" rx="400" ry="220" fill="#c8d1e7" opacity="0.22" />
                </svg>
            </Box>
            <Paper elevation={12} sx={{
                p: 5,
                borderRadius: 5,
                minWidth: 350,
                maxWidth: 400,
                boxShadow: '0 12px 40px rgba(0,0,0,0.13)',
                zIndex: 2,
                position: 'relative',
                background: 'rgba(255,255,255,0.98)',
            }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                    <img src="/assets/icons/logo.jpg" alt="Logo" style={{ width: 56, height: 56, marginBottom: 8, borderRadius: 12 }} />
                    <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
                        Welcome Back
                    </Typography>
                </Box>
                <Tabs value={loginRole} onChange={handleRoleChange} centered sx={{ mb: 2 }}>
                    <Tab label="Admin" value="admin" sx={{ fontWeight: 600 }} />
                    <Tab label="Employee" value="employee" sx={{ fontWeight: 600 }} />
                </Tabs>
                <Box sx={{ width: '100%', mb: 2 }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }} />
                </Box>
                <form onSubmit={handleSubmit}>
                    {loginRole === 'admin' ? (
                        <TextField
                            label="Email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            type="email"
                            required
                            autoFocus
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
                            autoFocus
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
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                        <Button variant="text" size="small" sx={{ textTransform: 'none' }} href="#">
                            Forgot password?
                        </Button>
                    </Box>
                    {error && (
                        <Alert severity="error" sx={{ mt: 2, fontWeight: 500, fontSize: '0.95rem' }}>
                            {typeof error === 'string' ? error : 'Login failed. Please try again.'}
                        </Alert>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 3, py: 1.7, fontWeight: 700, fontSize: '1.08rem', letterSpacing: 0.5, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}
