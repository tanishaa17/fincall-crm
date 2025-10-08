import { setAuthTokens, clearAuthTokens } from 'src/auth/utils/secure-storage';

export function setAuthCookies(token, role) {
    // Use secure storage utility instead of direct cookie manipulation
    setAuthTokens(token, role);
}

export function clearAuthCookies() {
    // Use secure storage utility instead of direct cookie manipulation
    clearAuthTokens();
}
