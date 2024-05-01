// SELECT * FROM "speed-typer_account" LEFT JOIN "speed-typer_wordsPerMinute" on "speed-typer_account"."clerkId" = "speed-typer_wordsPerMinute"."accountId" WHERE "speed-typer_wordsPerMinute"."WPM" IS NOT NULL ORDER BY "speed-typer_wordsPerMinute"."WPM" DESC LIMIT 10;

import { getLeaderBoard } from "@/app/db/db";
import { NextResponse } from "next/server";

export async function GET() {
    const data = await getLeaderBoard();
    console.log("TESTING PLEASE NOTICE ME!!!!!!!!!");
    return NextResponse.json(data);
}