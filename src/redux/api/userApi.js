
import axios from 'axios';

// Fetch user profile using the token
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';
const api = axios.create({ baseURL });

export async function fetchUserProfile(token) {
    const res = await api.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.user;
}
