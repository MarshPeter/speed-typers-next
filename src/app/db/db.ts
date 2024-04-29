import { newUser } from "@/models/newUser";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { account, dailyWordsPerMinute } from "./schema";
import { BestWPMDay } from "@/models/bestWPMDay";

export const db = drizzle(sql);

export async function createUser(data: newUser) {
    const newUser = await db.insert(account).values(data).returning({ username: account.username });
    return newUser;
}

export async function saveWPM(WPM: string, accountId: string) {
    await db.insert(dailyWordsPerMinute).values({
        bestWPMForDay: WPM,
        dateOfResult: new Date(),
        clerkId: accountId
    });
}
 