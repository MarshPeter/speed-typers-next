import { getLeaderBoard } from "@/app/db/db";
import { NextResponse } from "next/server";

export async function GET() {
    const data = await getLeaderBoard();
    console.log("TESTING PLEASE NOTICE ME!!!!!!!!!");
    return NextResponse.json(data);
}