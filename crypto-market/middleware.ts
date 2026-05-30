import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_ROUTES = [
  '/login',
  '/api/auth/login',
  '/api/public/country',
]
const OTP_ROUTE = '/otp'
const OTP_API_ROUTE = '/api/auth/otp'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next()
  }

  const token    = request.cookies.get('auth_token')?.value
  const loginOtp = request.cookies.get('login_otp')?.value

  if (pathname.startsWith(OTP_ROUTE) || pathname.startsWith(OTP_API_ROUTE)) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
  }

  if (!token || !loginOtp) {
    if (token && !loginOtp) {
      return NextResponse.redirect(new URL('/otp', request.url))
    }
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}