/**
 * Secure Token Storage Utility
 * Single source of truth for authentication tokens
 * Uses secure cookies with proper security attributes
 */

// ----------------------------------------------------------------------

const TOKEN_KEY = 'auth_token';
const ROLE_KEY = 'user_role';
const REFRESH_TOKEN_KEY = 'refresh_token';

// ----------------------------------------------------------------------

/**
 * Set authentication tokens securely
 * @param {string} accessToken - JWT access token
 * @param {string} role - User role (admin/employee)
 * @param {string} refreshToken - Optional refresh token
 * @param {number} expiresIn - Token expiration in seconds (default: 1 hour)
 */
export function setAuthTokens(accessToken, role, refreshToken = null, expiresIn = 3600) {
  if (typeof window === 'undefined') return; // SSR safety

  const cookieOptions = {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: 'lax', // CSRF protection
    path: '/', // Available site-wide
    maxAge: expiresIn, // Auto-expire
  };

  // Set access token
  setCookie(TOKEN_KEY, accessToken, cookieOptions);
  
  // Set role
  setCookie(ROLE_KEY, role, cookieOptions);
  
  // Set refresh token if provided (longer expiration)
  if (refreshToken) {
    setCookie(REFRESH_TOKEN_KEY, refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 3600, // 7 days for refresh token
    });
  }
}

// ----------------------------------------------------------------------

/**
 * Get authentication token from cookies
 * @returns {string|null} Access token or null
 */
export function getAuthToken() {
  if (typeof window === 'undefined') return null;
  return getCookie(TOKEN_KEY);
}

// ----------------------------------------------------------------------

/**
 * Get user role from cookies
 * @returns {string|null} User role or null
 */
export function getUserRole() {
  if (typeof window === 'undefined') return null;
  return getCookie(ROLE_KEY);
}

// ----------------------------------------------------------------------

/**
 * Get refresh token from cookies
 * @returns {string|null} Refresh token or null
 */
export function getRefreshToken() {
  if (typeof window === 'undefined') return null;
  return getCookie(REFRESH_TOKEN_KEY);
}

// ----------------------------------------------------------------------

/**
 * Clear all authentication tokens
 */
export function clearAuthTokens() {
  if (typeof window === 'undefined') return;

  const clearOptions = 'path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  
  setCookie(TOKEN_KEY, '', clearOptions);
  setCookie(ROLE_KEY, '', clearOptions);
  setCookie(REFRESH_TOKEN_KEY, '', clearOptions);
}

// ----------------------------------------------------------------------

/**
 * Check if user is authenticated
 * @returns {boolean} True if authenticated
 */
export function isAuthenticated() {
  const token = getAuthToken();
  const role = getUserRole();
  
  return !!(token && role && isValidToken(token));
}

// ----------------------------------------------------------------------

/**
 * Validate JWT token
 * @param {string} token - JWT token to validate
 * @returns {boolean} True if valid
 */
export function isValidToken(token) {
  if (!token) return false;

  try {
    const payload = getTokenPayload(token);
    if (!payload || !payload.exp) return false;
    
    const currentTime = Date.now() / 1000;
    return payload.exp > currentTime;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
}

// ----------------------------------------------------------------------

/**
 * Get token payload
 * @param {string} token - JWT token
 * @returns {object|null} Token payload or null
 */
export function getTokenPayload(token) {
  if (!token) return null;

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch (error) {
    console.error('Token decode error:', error);
    return null;
  }
}

// ----------------------------------------------------------------------

/**
 * Set axios authorization header
 * @param {string} token - JWT token
 */
export function setAxiosAuthHeader(token) {
  if (typeof window === 'undefined') return;
  
  // Import axios dynamically to avoid SSR issues
  import('src/lib/axios').then(({ default: axios }) => {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
  });
}

// ----------------------------------------------------------------------

/**
 * Helper: Set cookie with options
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {object|string} options - Cookie options or options string
 */
function setCookie(name, value, options) {
  if (typeof options === 'string') {
    document.cookie = `${name}=${value}; ${options}`;
    return;
  }

  const parts = [`${name}=${value}`];
  
  if (options.secure) parts.push('Secure');
  if (options.sameSite) parts.push(`SameSite=${options.sameSite}`);
  if (options.path) parts.push(`Path=${options.path}`);
  if (options.maxAge) parts.push(`Max-Age=${options.maxAge}`);
  if (options.expires) parts.push(`Expires=${options.expires}`);
  
  document.cookie = parts.join('; ');
}

// ----------------------------------------------------------------------

/**
 * Helper: Get cookie value by name
 * @param {string} name - Cookie name
 * @returns {string|null} Cookie value or null
 */
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  
  return null;
}

// ----------------------------------------------------------------------

/**
 * Token refresh utility
 * @returns {Promise<boolean>} True if refresh successful
 */
export async function refreshAuthToken() {
  const refreshToken = getRefreshToken();
  
  if (!refreshToken) {
    clearAuthTokens();
    return false;
  }

  try {
    const { default: axios } = await import('src/lib/axios');
    
    const response = await axios.post('/auth/refresh', {
      refreshToken
    });

    if (response.data && response.data.accessToken) {
      const { accessToken, role, expiresIn } = response.data;
      setAuthTokens(accessToken, role, refreshToken, expiresIn);
      setAxiosAuthHeader(accessToken);
      return true;
    } else {
      clearAuthTokens();
      return false;
    }
  } catch (error) {
    console.error('Token refresh failed:', error);
    clearAuthTokens();
    return false;
  }
}
