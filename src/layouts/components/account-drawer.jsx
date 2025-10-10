'use client';

import { varAlpha } from 'minimal-shared/utils';
import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import Tooltip from '@mui/material/Tooltip';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';
import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { useAuthContext, useMockedUser } from 'src/auth/hooks';

import { AccountButton } from './account-button';
import { SignOutButton } from './sign-out-button';

// ----------------------------------------------------------------------

export function AccountDrawer({ data = [], sx, ...other }) {
  const pathname = usePathname();

  const { user } = useMockedUser();
  const { logout } = useAuthContext();

  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  const renderAvatar = () => (
    <Avatar src={user?.user_image} alt={user?.user_name} sx={{ width: 96, height: 96 }}>
      {user?.user_name?.charAt(0).toUpperCase()}
    </Avatar>
  );

  const renderList = () => (
    <MenuList
      disablePadding
      sx={[
        (theme) => ({
          py: 3,
          px: 2.5,
          borderTop: `dashed 1px ${theme.vars.palette.divider}`,
          borderBottom: `dashed 1px ${theme.vars.palette.divider}`,
          '& li': { p: 0 },
        }),
      ]}
    >
      <MenuItem>
        <Link
          component={RouterLink}
          href={paths.dashboard.profile}
          color="inherit"
          underline="none"
          onClick={onClose}
          sx={{
            p: 1,
            width: 1,
            display: 'flex',
            typography: 'body2',
            alignItems: 'center',
            color: 'text.secondary',
            '& svg': { width: 24, height: 24 },
            '&:hover': { color: 'text.primary' },
          }}
        >
          <Iconify icon="mingcute:user-3-line" width={24} />
          <Box component="span" sx={{ ml: 2 }}>
            Profile Page
          </Box>
        </Link>
      </MenuItem>

      <MenuItem>
        <Box
          sx={{
            p: 1,
            width: 1,
            display: 'flex',
            typography: 'body2',
            alignItems: 'center',
            color: 'text.secondary',
            '& svg': { width: 24, height: 24 },
            '&:hover': { color: 'text.primary' },
          }}
        >
          <Iconify icon="mingcute:settings-3-line" width={24} />
          <Box component="span" sx={{ ml: 2 }}>
            Account Settings
          </Box>
        </Box>
      </MenuItem>
      <MenuItem sx={{ pl: 5 }}>
        <Link
          component={RouterLink}
          href={paths.auth.changePassword}
          color="inherit"
          underline="none"
          onClick={onClose}
          sx={{
            p: 1,
            width: 1,
            display: 'flex',
            typography: 'body2',
            alignItems: 'center',
            color: 'text.secondary',
            '&:hover': { color: 'text.primary' },
          }}
        >
          Change Password
        </Link>
      </MenuItem>
      <MenuItem sx={{ pl: 5 }}>
        <SignOutButton
          variant="text"
          onClick={() => {
            logout();
            onClose();
          }}
          onClose={onClose}
          sx={{ width: 1, justifyContent: 'flex-start', color: 'text.secondary' }}
        >
          Logout
        </SignOutButton>
      </MenuItem>

    </MenuList>
  );

  return (
    <>
      <AccountButton
        onClick={onOpen}
        photoURL={user?.photoURL}
        displayName={user?.displayName}
        sx={sx}
        {...other}
      />

      <Drawer
        open={open}
        onClose={onClose}
        anchor="right"
        slotProps={{
          backdrop: { invisible: true },
          paper: { sx: { width: 320 } },
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            top: 12,
            left: 12,
            zIndex: 9,
            position: 'absolute',
          }}
        >
          <Iconify icon="mingcute:close-line" />
        </IconButton>

        <Scrollbar>
          <Box
            sx={{
              pt: 8,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            {renderAvatar()}

            <Typography variant="subtitle1" noWrap sx={{ mt: 2 }}>
              {user?.user_name}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }} noWrap>
              {user?.user_type}
            </Typography>
          </Box>

          {renderList()}
        </Scrollbar>

      </Drawer>
    </>
  );
}
