import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

type ExpenseRequest = {
    item: string;
    price: number;
}

export async function POST(req: NextRequest) {
    const data = (await req.json()) as Partial<ExpenseRequest> ;
    if (!data.item || !data.price){
        return NextResponse.json({error:"Missing fields"}, {status:400});
    }

    if(typeof data.item !== "string" || typeof data.price!=="number"){
        return NextResponse.json({error:"Invalid types"}, {status: 400})
    }

    // const expense = {
    //     item: data.item,
    //     price: data.price,
    //     date: new Date().toISOString(),
    // };

    return NextResponse.json({success: true}, {status:200});
} 