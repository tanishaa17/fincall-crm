import Cookies from 'js-cookie';

export function setAuthCookies(token, role) {
    // For local development, do not use 'secure: true'. Use 'sameSite: lax'.
    Cookies.set('token', token, { sameSite: 'lax' });
    Cookies.set('role', role, { sameSite: 'lax' });
}

export function clearAuthCookies() {
    Cookies.remove('token');
    Cookies.remove('role');
}
