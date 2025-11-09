import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const jwtSecret = process.env.JWT_SECRET;
  
  return NextResponse.json({
    jwtSecretExists: !!jwtSecret,
    jwtSecretLength: jwtSecret?.length || 0,
    jwtSecretFirst5: jwtSecret?.substring(0, 5) || "not found",
    // Never log the full secret in production!
  });
}
