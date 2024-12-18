import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

const protectedRoutes = ['/bookmark', '/draft', '/write']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some(e => path.startsWith(e));

  const session = await auth();

  if (isProtectedRoute && !session?.user) {
    const redirectUrl = new URL('/login', req.nextUrl);
    redirectUrl.searchParams.set('from', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}