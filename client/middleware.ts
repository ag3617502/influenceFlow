import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the token from cookies
  const token = request.cookies.get('accessToken')?.value;

  // Define public and auth routes
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup');
  const protectedPrefixes = ['/dashboard', '/clients', '/deals', '/invoices', '/expenses', '/partners', '/analytics', '/notifications', '/settings'];
  const isProtectedRoute = protectedPrefixes.some(prefix => pathname.startsWith(prefix));
  const isPublicRoute = pathname === '/' || pathname.startsWith('/about') || pathname.startsWith('/blog');

  // 1. If user is logged in and trying to access auth routes (login/signup), redirect to dashboard
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 2. If user is NOT logged in and trying to access protected routes, redirect to login
  if (!token && isProtectedRoute) {
    console.log(`Protecting route: ${pathname}, redirecting to login`);
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  console.log(`Middleware allowing: ${pathname}`);
  return NextResponse.next();
}

// Specify which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
