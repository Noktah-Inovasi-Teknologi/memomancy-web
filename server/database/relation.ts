import { relations } from "drizzle-orm";
import { events, medias } from "./schema";

export const eventRelations = relations(events, ({ many }) => ({
  medias: many(medias),
}));
export const mediaRelations = relations(medias, ({ one }) => ({
  event: one(events, {
    fields: [medias.eventId],
    references: [events.id],
  }),
}));
