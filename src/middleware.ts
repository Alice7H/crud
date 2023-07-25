import { NextRequest, NextResponse } from "next/server"

export const config = {
  matcher: ['/users/:path*', '/account/:path*'],
}

export function middleware(request: NextRequest) {
    const hasToken = request.cookies.get('token')?.value;

    if ((!hasToken || hasToken.length == 0) && request.nextUrl.pathname.includes('/users')) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/account/login`)
    }
    if(hasToken && hasToken.length != 0 &&
      (request.nextUrl.pathname.includes('/login')|| request.nextUrl.pathname.includes('/register'))) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/users`)
    }
    if(hasToken && hasToken.length != 0 && request.nextUrl.pathname == '/'){
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/users`)
    }
    return NextResponse.next();
}
