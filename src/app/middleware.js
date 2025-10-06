import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get('token');
    const { pathname } = request.nextUrl;

    // If not authenticated, redirect to login for dashboard routes
    if (!token && pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    // If authenticated and trying to access login, redirect to dashboard
    if (token && pathname.startsWith('/auth/login')) {
        return NextResponse.redirect(new URL('/dashboard/admin', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/auth/login'],
};
