import { NextResponse } from "next/server";

export const runtime = "edge";
export async function POST(){
    const res = NextResponse.json({success: true});
    res.cookies.set("auth_token","", {path:"/", maxAge:0});
    return res;
}