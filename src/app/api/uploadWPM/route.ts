import { saveWPM } from "@/app/db/db";
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest, res: NextResponse) {
    const data = await req.json();
    const userId = data.userId;
    const WPM = data.WPM;

    saveWPM(WPM, userId)

    return NextResponse.json({data: "success"}, {status: 200});
}