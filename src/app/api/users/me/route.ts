import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest){
    const cookie = req.headers.get("cookie") || "";
    const token = cookie.split("; ").find(row => row.startsWith("auth_token="))?.split("=")[1];

    if (!token){
        return NextResponse.json({error:"Unauthorized"}, {status:401});
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return NextResponse.json({user:payload.username}, {status:200}); 
}