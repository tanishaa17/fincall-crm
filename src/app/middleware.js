import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get('token');
    const role = request.cookies.get('role');
    const { pathname } = request.nextUrl;

    // Only handle basic route protection at server level
    // Let client-side guards handle the detailed authentication logic
    
    // If not authenticated, redirect to login for dashboard routes
    if (!token && pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Only redirect from login if we have a valid token AND role
    // This prevents redirect loops when token exists but role is missing
    if (token && role && pathname.startsWith('/auth/login')) {
        const target = role.value === 'employee' ? '/dashboard/employee' : '/dashboard/admin';
        return NextResponse.redirect(new URL(target, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/auth/login'],
};
