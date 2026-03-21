import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/tournaments'];
const authRoutes = ['/login', '/register'];

export function proxy(req: NextRequest) {
  // Check for token in cookies (set by backend login)
  const token = req.cookies.get('auth_token')?.value;
  const { pathname } = req.nextUrl;

  // If user is logged in and tries to access login/register, redirect to dashboard
  if (authRoutes.some(route => pathname.startsWith(route)) && token) {
    return NextResponse.redirect(new URL('/tournaments', req.url));
  }

  // If user is not logged in and tries to access protected routes, redirect to login
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
