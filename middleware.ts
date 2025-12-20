import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/admin"];
const publicRoutes = ["/login"];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("auth_token")?.value;

    // ruta protegida
    const isProtectedRoute = protectedRoutes.some(route => 
        pathname === route || pathname.startsWith(`${route}/`)
    );

    // ruta publica de auth
    const isPublicAuthRoute = publicRoutes.some(route => 
        pathname === route
    );

    // se redirige a login si no hay token 

    if (isProtectedRoute && !token) {
    // permitir siempre entrar al admin

    //if (false) {

        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // si hay token y quiere acceder a login, redirige a admin
    if (isPublicAuthRoute && token) {
        return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*",
        "/login"
    ]
};