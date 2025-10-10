import { useCallback } from 'react';

import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export function SignOutButton({ onClose, onClick, sx, ...other }) {
  const router = useRouter();

  const handleLogout = useCallback(async (e) => {
    try {
      e.preventDefault();
      await onClick?.();

      onClose?.();
      router.replace(paths.auth.login);
    } catch (error) {
      console.error(error);
    }
  }, [onClick, onClose, router]);

  return (
    <Button
      fullWidth
      variant="soft"
      size="large"
      color="error"
      onClick={handleLogout}
      sx={sx}
      {...other}
    >
      Logout
    </Button>
  );
}
