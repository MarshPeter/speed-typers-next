import { newUser } from "@/models/newUser";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { account, wordsPerMinute } from "./schema";
import { BestWPMDay } from "@/models/bestWPMDay";
import { desc, eq, exists, isNotNull } from "drizzle-orm";
import { LeaderboardResult } from "@/models/leaderboardResult";
import { Result } from "@/models/result";

export const db = drizzle(sql);

export async function createUser(data: newUser) {
    const newUser = await db.insert(account).values(data).returning({ username: account.username });
    return newUser;
}

export async function saveWPM(WPM: string, accountId: string) {
    await db.insert(wordsPerMinute).values({
        WPM: WPM,
        dateOfResult: new Date(),
        accountId: accountId
    });
}

export async function getLeaderBoard(): Promise<Array<LeaderboardResult>> {
    const result = await db.select({
        username: account.username,
        WPM: wordsPerMinute.WPM,
    })
    .from(account)
    .leftJoin(wordsPerMinute, eq(account.clerkId, wordsPerMinute.accountId))
    .where(isNotNull(wordsPerMinute.WPM))
    .orderBy(desc(wordsPerMinute.WPM))
    .limit(10);

    return result;
}

export async function getPersonalLeaderBoard(id: string): Promise<Array<Result>> {
    const result = await db.select({
        WPM: wordsPerMinute.WPM,
    })
    .from(wordsPerMinute)
    .orderBy(desc(wordsPerMinute.WPM))
    .limit(5);

    return result;
}

 