import { getLeaderBoard } from "@/app/db/db";
import { NextResponse } from "next/server";

export async function GET() {
    const data = await getLeaderBoard();
    return NextResponse.json(data);
}