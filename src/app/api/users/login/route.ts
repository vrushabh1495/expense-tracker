import { NextRequest, NextResponse } from "next/server";
import { comparePassword, generateToken } from "@/lib/auth";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { Env } from "@/types/env";

export const runtime = "edge";

export async function POST(req: NextRequest){
    const { env } = getRequestContext();
    const { username, password } = await req.json() as {username? : string, password? : string};

    if(!username || !password){
        return NextResponse.json({error:"Missing Credentials"}, {status:400});
    }
    
    const storedHash = await ( env as Env).EXPENSE_TRACKER_AUTH_KV.get(username);
    if(!storedHash){
        return NextResponse.json({error:"Invalid Credentials. Check if you have signed up"}, {status: 401});
    }

    const validPassword = await comparePassword(password, storedHash);
    if(!validPassword){
        return NextResponse.json({error:"Incorrect Password"}, {status:401});
    }

    const token = await generateToken(username);

    const res = NextResponse.json({success: true });

    res.cookies.set("auth_token", token, {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "strict"
    });

    return res;
}