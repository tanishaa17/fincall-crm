import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get('token');
    const role = request.cookies.get('role');
    const { pathname } = request.nextUrl;

    // If not authenticated, redirect to login for dashboard routes
    if (!token && pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // If authenticated and trying to access login, redirect to role-specific dashboard
    if (token && pathname.startsWith('/auth/login')) {
        const target = role?.value === 'employee' ? '/dashboard/employee' : '/dashboard/admin';
        return NextResponse.redirect(new URL(target, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/auth/login'],
};
