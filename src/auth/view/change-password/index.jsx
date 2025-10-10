'use client';

import * as yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import { Box, Card, Stack, TextField, Typography } from '@mui/material';

import axios, { endpoints } from 'src/lib/axios';

// ----------------------------------------------------------------------

const ChangePasswordSchema = yup.object().shape({
  current_password: yup.string().required('Current password is required'),
  new_password: yup.string().min(6, 'Password must be at least 6 characters').required('New password is required'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('new_password')], 'Passwords must match')
    .required('Confirm password is required'),
});

export function ChangePasswordView() {
  const [formData, setFormData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(ChangePasswordSchema),
    defaultValues: formData,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (data) => {
    setMessage({ type: '', text: '' });
    setLoading(true);

    try {
      const response = await axios.post(endpoints.auth.changePassword, data);
      setMessage({ type: 'success', text: response.data.message || 'Password changed successfully!' });
      setFormData({ current_password: '', new_password: '', confirm_password: '' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Failed to change password.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f0f2f5 0%, #e0e7ee 100%)',
        padding: 3,
      }}
    >
      <Card sx={{ p: 4, width: 1, maxWidth: 420, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Change Password
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <TextField
              name="current_password"
              label="Current Password"
              type="password"
              value={formData.current_password}
              onChange={handleChange}
              required
              fullWidth
              {...register('current_password')}
              error={!!errors.current_password}
              helperText={errors.current_password?.message}
            />

            <TextField
              name="new_password"
              label="New Password"
              type="password"
              value={formData.new_password}
              onChange={handleChange}
              required
              fullWidth
              {...register('new_password')}
              error={!!errors.new_password}
              helperText={errors.new_password?.message}
            />

            <TextField
              name="confirm_password"
              label="Confirm New Password"
              type="password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
              fullWidth
              {...register('confirm_password')}
              error={!!errors.confirm_password}
              helperText={errors.confirm_password?.message}
            />

            {message.text && (
              <Typography color={message.type === 'error' ? 'error' : 'success.main'} variant="body2">
                {message.text}
              </Typography>
            )}

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={loading}
              sx={{ mt: 3 }}
            >
              Change Password
            </LoadingButton>
          </Stack>
        </form>
      </Card>
    </Box>
  );
}
