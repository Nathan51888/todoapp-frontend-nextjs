import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ['/dashboard', '/profile',]
const publicRoutes = ['/', '/login', '/signup']

export async function middleware(req: NextRequest) {
    // check path
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoutes = publicRoutes.includes(path)

    // get refresh token
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get("refreshToken")?.value as string
    const accessToken = cookieStore.get("accessToken")?.value as string

    // redirect to login if refresh token doesn't exist
    if (isProtectedRoute && !refreshToken) {
        console.log("protected route with no refresh token")
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    // redirect to login if access token doesn't exist
    if (isProtectedRoute && !accessToken) {
        console.log("protected route with no access token")
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    // verify access token
    if (isProtectedRoute) {
        // possibly fetch refresh-token route
    }


    // redirect to dashboard if token exists
    // if (isPublicRoutes && token && !req.nextUrl.pathname.startsWith('/dashboard')) {
    //     return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    // }

    // continue if on public routes
    if (isPublicRoutes) {
        return NextResponse.next()
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
