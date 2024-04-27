import { newUser } from "@/models/newUser";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { account } from "./schema";

export const db = drizzle(sql);

export async function createUser(data: newUser) {
    await db.insert(account).values(data);
}
 