import axios from 'src/lib/axios';

let token = null;

export function setToken(newToken) {
    token = newToken;
}

export function getToken() {
    return token;
}

export async function adminLogin({ email, password }) {
    const res = await axios.post('/api/v1/auth/admin/login', { email, password });
    if (res.data.token) setToken(res.data.token);
    return res.data;
}

export async function employeeLogin({ code, password }) {
    const res = await axios.post('/api/v1/auth/employee/login', { code, password });
    if (res.data.token) setToken(res.data.token);
    return res.data;
}

export async function logout() {
    await axios.post('/api/v1/auth/logout', {}, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    setToken(null);
}
