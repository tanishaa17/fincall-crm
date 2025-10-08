'use client';

import { useSetState } from 'minimal-shared/hooks';
import { useMemo, useState, useEffect, useCallback } from 'react';

import axios, { endpoints } from 'src/lib/axios';

import { 
  getUserRole, 
  getAuthToken, 
  isAuthenticated, 
  clearAuthTokens,
  getTokenPayload,
  setAxiosAuthHeader
} from 'src/auth/utils/secure-storage';

import { AuthContext } from '../auth-context';

// ----------------------------------------------------------------------

/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */

export function AuthProvider({ children }) {
  const { state, setState } = useSetState({ user: null, loading: true });
  const [isChecking, setIsChecking] = useState(false);

  const checkUserSession = useCallback(async () => {
    if (isChecking) {
      console.log('Auth check already in progress, skipping...');
      return; // Prevent multiple simultaneous checks
    }
    
    console.log('Starting auth check...');
    setIsChecking(true);
    try {
      // Use secure storage utility - single source of truth
      const token = getAuthToken();
      const role = getUserRole();

      if (token && role && isAuthenticated()) {
        // Set axios authorization header
        setAxiosAuthHeader(token);
        
        // Create a basic user object with token and role
        const basicUser = {
          accessToken: token,
          role,
          id: getTokenPayload(token)?.sub || 'temp', // Get user ID from token
        };

        // Set authenticated state immediately to prevent redirect loops
        console.log('Setting authenticated user:', basicUser);
        setState({ user: basicUser, loading: false });

        // Try to fetch user details, but don't let it block authentication
        try {
          const res = await axios.get(endpoints.auth.me);
          const { user } = res.data;
          const userWithRole = { ...user, role, accessToken: token };
          setState({ user: userWithRole, loading: false });
        } catch (apiError) {
          console.warn('Failed to fetch user details, but keeping authentication:', apiError);
          // Keep the basic user object - don't clear authentication on API failure
          // But if it's a 401/403, the token might be invalid, so clear it
          if (apiError.response?.status === 401 || apiError.response?.status === 403) {
            console.warn('Token appears to be invalid, clearing authentication');
            clearAuthTokens();
            setAxiosAuthHeader(null);
            setState({ user: null, loading: false });
            return;
          }
        }
      } else {
        console.log('No valid token found, setting user to null');
        setState({ user: null, loading: false });
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      setState({ user: null, loading: false });
    } finally {
      console.log('Auth check completed, setting isChecking to false');
      setIsChecking(false);
    }
  }, [setState]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // Add a small delay to prevent race conditions with middleware
    const timer = setTimeout(() => {
      checkUserSession();
    }, 100);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user ? { ...state.user, role: state.user?.role ?? 'admin' } : null,
      checkUserSession,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
    }),
    [checkUserSession, state.user, status]
  );

  return <AuthContext value={memoizedValue}>{children}</AuthContext>;
}
