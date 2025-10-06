"use client";

import React from "react";
import { useSelector } from "react-redux";

import { Box, Typography } from "@mui/material";

export default function AdminDashboard() {
    const { user } = useSelector((state) => state.auth);
    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h3" fontWeight={700} gutterBottom>
                Admin Dashboard
            </Typography>
            <Typography variant="body1">Welcome, {user?.name || "Admin"}!</Typography>
            {/* Add admin dashboard content here */}
        </Box>
    );
}
