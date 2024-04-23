import { db } from "@/app/db/db";
import { usersTable } from "@/app/db/schema";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // static by default, unless reading the request
export const runtime = "nodejs"; // specify the runtime to be node

export async function GET(request: Request) {
    const users = await db.select().from(usersTable);

    return NextResponse.json({ users, message: "success" });
}
