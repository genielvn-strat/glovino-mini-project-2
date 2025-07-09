import {
    integer,
    pgTable,
    serial,
    text,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";

export const blogs = pgTable("blogs", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    author: varchar("author", { length: 50 }).default("Anonymous"),
    summary: varchar("summary", { length: 500 }).notNull(),
    body: text("body").notNull(),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
    slug: varchar("slug").unique().notNull(),
});

export const comments = pgTable("comments", {
    id: serial("id").primaryKey(),
    author: varchar("author", { length: 50 }).default("Anonymous"),
    body: text("body").notNull(),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
    blog: integer("blog")
        .references(() => blogs.id)
        .notNull(),
});
