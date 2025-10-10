'use client';

import { Box } from '@mui/system';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Create User Page</Typography>
      <Typography variant="body1">This is where the user creation form will go.</Typography>
    </Box>
  );
}
