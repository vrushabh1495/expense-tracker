import { D1Database } from '@cloudflare/workers-types';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { Env } from '@/types/env';
// export interface Env {
//     expense_tracker_db: D1Database;
// }

import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

type ExpenseRequest = {
    item: string;
    price: number;
    username: string;
}


export async function POST(req: NextRequest) {
    const data = (await req.json()) as Partial<ExpenseRequest> ;
    const { env } = getRequestContext(); 
    if (!data.item || !data.price || !data.username){
        return NextResponse.json({error:"Missing fields"}, {status:400});
    }

    if(typeof data.item !== "string" || typeof data.price!=="number" || typeof data.username !== "string"){
        return NextResponse.json({error:"Invalid types"}, {status: 400})
    }

    const expense = {
        item: data.item,
        price: data.price,
        date: new Date().toISOString().split("T")[0],
        username: data.username,
    };

    const result = await (env as Env).expense_tracker_db
        .prepare("INSERT INTO expenses (item, price, date, username) VALUES (?, ?, ?, ?)")
        .bind(expense.item, expense.price, expense.date, expense.username)
        .run();
    
    if (!result.success){
        return NextResponse.json({error:"Failed to add expense"}, {status:500});
    }
    
    return NextResponse.json({success: true}, {status:200});
} 

export async function GET(req: NextRequest) {
    const { env } = getRequestContext();
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
        return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    const results = await (env as Env).expense_tracker_db
        .prepare("SELECT * FROM expenses WHERE username = ? ORDER BY date DESC")
        .bind(username)
        .all();
    
    console.log(results);
    return NextResponse.json({ expenses: results.results }, { status: 200 });
}