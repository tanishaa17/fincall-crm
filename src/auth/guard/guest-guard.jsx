'use client';

import { useState, useEffect } from 'react';

import { useRouter, useSearchParams } from 'src/routes/hooks';

import { CONFIG } from 'src/global-config';

import { SplashScreen } from 'src/components/loading-screen';

import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

export function GuestGuard({ children }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { loading, authenticated, user } = useAuthContext();

  const returnTo = searchParams.get('returnTo') ?? CONFIG.auth.redirectPath;

  const [isChecking, setIsChecking] = useState(true);

  const checkPermissions = async () => {
    if (loading) {
      return;
    }

    if (authenticated) {
      // Determine the correct dashboard based on user role
      const userRole = user?.role;
      
      let targetPath = returnTo;
      
      // If returnTo is the default admin path, redirect to role-specific dashboard
      if (returnTo === CONFIG.auth.redirectPath) {
        targetPath = userRole === 'employee' ? '/dashboard/employee' : '/dashboard/admin';
      }
      
      // Only redirect if we're not already on the target path
      if (targetPath && !window.location.pathname.startsWith(targetPath.split('?')[0])) {
        console.log('GuestGuard: Redirecting authenticated user to:', targetPath);
        router.replace(targetPath);
      } else {
        setIsChecking(false);
      }
      return;
    }

    setIsChecking(false);
  };

  useEffect(() => {
    checkPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, loading]);

  if (isChecking) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
