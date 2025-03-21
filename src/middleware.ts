import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    // if (!request.nextUrl.pathname.startsWith("/login")) {
    //     if (!request.cookies.has("refreshToken")) {
    //         console.log("no token")
    //         return NextResponse.redirect(new URL("/login", request.url))
    //     }
    // }
    //
    //
    // return NextResponse.next()
}

export const config = {
    matcher: ["/:path*", "/profile:path*"]
}
