
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setAuthFromCookie, fetchUserProfileThunk } from '../slices/authSlice';

export default function useRehydrateAuth() {
    const dispatch = useDispatch();
    useEffect(() => {
        // Only run on initial mount
        const token = Cookies.get('token');
        const role = Cookies.get('role');
        if (token && role) {
            dispatch(setAuthFromCookie({ token, role }));
            dispatch(fetchUserProfileThunk(token));
        }
    }, []); // no dispatch in deps to avoid infinite loop
}
