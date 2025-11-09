import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_PATHS = ["/login", "/signup", "/_next", "/favicon.ico", "/api"];

export async function middleware(req: NextRequest) {
    const {pathname} = req.nextUrl;

    if(PUBLIC_PATHS.some(path=> pathname.startsWith(path))){
        return NextResponse.next();
    }

    const token = req.cookies.get("auth_token")?.value;

    if (!token){
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
        await jwtVerify(token, SECRET);
        return NextResponse.next();
    } catch(error){
        return NextResponse.redirect(new URL("/login", req.url));
    }
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};