'use client';

import { Box, Card, Grid, Typography, CardHeader, CardContent } from '@mui/material';

import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export default function Page() {
  const { user } = useAuthContext();

  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">Loading Profile...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>User Profile</Typography>
      <Card>
        <CardHeader title="Personal Information" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">User ID:</Typography>
              <Typography variant="body2">{user.user_id}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">User Name:</Typography>
              <Typography variant="body2">{user.user_name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Email:</Typography>
              <Typography variant="body2">{user.user_email}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Role:</Typography>
              <Typography variant="body2">{user.user_type}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Unique Code:</Typography>
              <Typography variant="body2">{user.user_unique_code}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Phone Number:</Typography>
              <Typography variant="body2">{user.user_number}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Address:</Typography>
              <Typography variant="body2">{user.user_address}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Status:</Typography>
              <Typography variant="body2">{user.user_status}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Work Status:</Typography>
              <Typography variant="body2">{user.user_work_status}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Joining Date:</Typography>
              <Typography variant="body2">{user.user_joining_date || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Date of Birth:</Typography>
              <Typography variant="body2">{user.user_dob || 'N/A'}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
