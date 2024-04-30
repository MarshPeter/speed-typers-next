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

export const wordsPerMinute = pgTable(`${prefix}_wordsPerMinute`, {
    id: serial("id").primaryKey(),
    WPM: numeric("WPM", { precision: 4, scale: 2 }).notNull(),
    dateOfResult: date("dateOfResult", { mode: "date" }).notNull(),
    accountId: text("accountId").references(() => account.clerkId).notNull(),
});
