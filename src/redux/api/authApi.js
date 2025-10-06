
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
    baseURL,
});

let token = null;

export function setToken(newToken) {
    token = newToken;
}

export function getToken() {
    return token;
}


export async function adminLogin({ email, password }) {
    const res = await api.post('/auth/admin/login', { email, password });
    if (res.data && res.data.access_token) setToken(res.data.access_token);
    console.log('Admin login response:', res.data);
    return res.data;
}


export async function employeeLogin({ code, password }) {
    const res = await api.post('/auth/employee/login', { code, password });
    if (res.data && res.data.access_token) setToken(res.data.access_token);
    console.log('Employee login response:', res.data);
    return res.data;
}


export async function logout() {
    await api.post('/auth/logout', {}, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    setToken(null);
}
