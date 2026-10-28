import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

/**
 * Messages sent through the contact form on the home page.
 * Inserted by the POST handler in src/app/api/contact/route.ts.
 */
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
