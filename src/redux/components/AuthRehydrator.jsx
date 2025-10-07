
// This component rehydrates Redux auth state from cookies on every page load

'use client';

import useRehydrateAuth from 'src/redux/hooks/useRehydrateAuth';

export default function AuthRehydrator({ children }) {
    useRehydrateAuth();
    return children;
}
