"use client";

import React from "react";
import { useSelector } from "react-redux";

import { Box, Typography } from "@mui/material";

export default function EmployeeDashboard() {
    const { user } = useSelector((state) => state.auth);
    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h3" fontWeight={700} gutterBottom>
                Employee Dashboard
            </Typography>
            <Typography variant="body1">Welcome, {user?.name || "Employee"}!</Typography>
            {/* Add employee dashboard content here */}
        </Box>
    );
}
