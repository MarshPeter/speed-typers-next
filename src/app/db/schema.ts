import {
    date,
    numeric,
    pgTable,
    serial,
    text,
    integer,
} from "drizzle-orm/pg-core";

const prefix = "speed-typer";

export const account = pgTable(`${prefix}_account`, {
    clerkId: text("clerkId").notNull().primaryKey(),
    username: text("username").notNull(),
});

export const dailyWordsPerMinute = pgTable(`${prefix}_dailyWordsPerMinute`, {
    id: serial("id").primaryKey(),
    bestWPMForDay: numeric("bestWPMForDay", { precision: 2 }).notNull(),
    dateOfResult: date("dateOfResult", { mode: "date" }).notNull(),
    clerkId: text("clerkId").references(() => account.clerkId).notNull(),
});
