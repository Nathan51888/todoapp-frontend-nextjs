import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ['/dashboard', '/profile', '/']
const publicRoutes = ['/login', '/signup']

export async function middleware(req: NextRequest) {
    // check path
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoutes = publicRoutes.includes(path)

    // get refresh token
    const cookieStore = await cookies()
    const token = cookieStore.get("refreshToken")?.value as string

    // redirect to login if token doesn't exist
    if (isProtectedRoute && !token) {
        console.log("protected route with no token")
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    // redirect to dashboard if token exists
    if (isPublicRoutes && token && !req.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    }

    // add Authorization header for protected routes
    if (isProtectedRoute) {
        console.log(token)
        const requestHeaders = new Headers(req.headers)
        requestHeaders.set("Authorization", token)
        const response = NextResponse.next({
            request: {
                headers: requestHeaders
            }
        })
        return response
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
