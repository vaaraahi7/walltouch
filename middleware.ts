import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Only handle specific routes that need protection
  // Let the admin pages handle their own authentication
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Only match specific routes if needed
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}
