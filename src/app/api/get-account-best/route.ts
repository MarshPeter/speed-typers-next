import { getPersonalLeaderBoard } from "@/app/db/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // static by default, unless reading the request
export const runtime = "nodejs"; // specify the runtime to be node

export async function GET(request: Request) {
    console.log("HELLO CAN YOU SEE ME")
    const {searchParams} = new URL(request.url);
    const id = searchParams.get('id')!;
    const data = await getPersonalLeaderBoard(id);
    console.log(data);
    return NextResponse.json(data);
}