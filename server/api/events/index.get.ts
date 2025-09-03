import { events, medias } from "../../database/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const eventId = query.id;

    if (eventId) {
      // Get specific event with its media
      const eventData = await useDrizzle()
        .select()
        .from(events)
        .where(eq(events.id, parseInt(eventId as string)))
        .limit(1);

      if (eventData.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: "Event not found"
        });
      }

      // Get associated media
      const eventMedia = await useDrizzle()
        .select()
        .from(medias)
        .where(eq(medias.eventId, parseInt(eventId as string)));

      return {
        status: 200,
        data: {
          ...eventData[0],
          mediaFiles: eventMedia
        }
      };
    } else {
      // Get all events with media count
      const allEvents = await useDrizzle()
        .select()
        .from(events);

      const eventsWithMediaCount = await Promise.all(
        allEvents.map(async (event) => {
          const mediaCount = await useDrizzle()
            .select()
            .from(medias)
            .where(eq(medias.eventId, event.id));

          return {
            ...event,
            mediaCount: mediaCount.length
          };
        })
      );

      return {
        status: 200,
        data: eventsWithMediaCount,
        count: allEvents.length
      };
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    throw createError({
      statusCode: 500,
      statusMessage: error instanceof Error ? error.message : "Failed to fetch events"
    });
  }
});