
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getUserRole, getAuthToken } from 'src/auth/utils/secure-storage';

import { setAuthFromCookie, fetchUserProfileThunk } from '../slices/authSlice';

export default function useRehydrateAuth() {
    const dispatch = useDispatch();
    useEffect(() => {
        // Only run on initial mount
        const token = getAuthToken();
        const role = getUserRole();
        if (token && role) {
            dispatch(setAuthFromCookie({ token, role }));
            dispatch(fetchUserProfileThunk(token));
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
