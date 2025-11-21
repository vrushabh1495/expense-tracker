import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { Env } from "@/types/env";



export const runtime = 'edge';

export async function POST(request: NextRequest){
    const data = await request.json() as {username? : string; email? : string; password?: string;};
    const { env } = getRequestContext();

    if (!data.username || !data.email || !data.password){
        return NextResponse.json({error:"Missing fields"}, {status:400})
    }

    const existingUser = await ( env as Env). EXPENSE_TRACKER_AUTH_KV.get(data.username);
    if(existingUser){
        return NextResponse.json({error:`User ${data.username} already exists`}, {status: 400});
    }

    const hashedPassword = await hashPassword(data.password);
    const user = {
        username: data.username.trim(),
        email: data.email,
        password: hashedPassword
    }
    console.log("The user being registered is: ",user);
    await ( env as Env).EXPENSE_TRACKER_AUTH_KV.put(data.username.trim(), hashedPassword);
    

    return NextResponse.json({message:`${data.username.trim()} created successfully`}, {status:201})
}


