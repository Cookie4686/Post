import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

const protectedRoutes = ['/draft', '/write']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some(e => path.startsWith(e));

  const session = await auth();
  console.log(session);


  if (isProtectedRoute && !session?.user) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}