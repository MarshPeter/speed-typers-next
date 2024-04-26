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
    id: serial("id").primaryKey(),
    username: text("username").notNull(),
    clerkId: text("clerkId").notNull(),
});

export const dailyWordsPerMinute = pgTable(`${prefix}_dailyWordsPerMinute`, {
    id: serial("id").primaryKey(),
    bestWPMForDay: numeric("bestWPMForDay", { precision: 2 }).notNull(),
    dateOfResult: date("dateOfResult", { mode: "date" }).notNull(),
    accountId: integer("accountId").references(() => account.id),
});
