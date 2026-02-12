import { sql } from "drizzle-orm";
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { text, integer, blob } from "drizzle-orm/sqlite-core";

export const events = sqliteTable("events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  startDate: integer("start_date", { mode: "timestamp" }).notNull(),
  endDate: integer("end_date", { mode: "timestamp" }).notNull(),
  location: text("location").notNull(),
  eventType: text("event_type").notNull(),
  outdoor: text().notNull(),
  media: text("media", { mode: "json" }),
  thumbnail: text("thumbnail"),
  capacity: integer().notNull(),
  region: text().notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const medias = sqliteTable("medias", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  type: text("type").notNull(),
  blobPath: text("blob_path").notNull(),
  eventId: integer("event_id").references(() => events.id),
  liked: integer("liked").default(0),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

