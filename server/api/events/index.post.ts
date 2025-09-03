import { events, medias } from "../../database/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event);
    
    if (!formData) {
      throw createError({
        statusCode: 400,
        statusMessage: "No form data received"
      });
    }

    // Separate files from form fields
    const files: any[] = [];
    const formFields: Record<string, any> = {};
    
    for (const item of formData) {
      if (item.filename) {
        files.push(item);
      } else if (item.name) {
        const value = item.data.toString();
        // Handle date fields
        if (item.name.includes('Date') || item.name.includes('At')) {
          formFields[item.name] = new Date(value);
        } else if (item.name === 'capacity') {
          formFields[item.name] = parseInt(value);
        } else {
          formFields[item.name] = value;
        }
      }
    }

    // Validate required fields
    const requiredFields = ['name', 'description', 'startDate', 'endDate', 'location', 'eventType', 'outdoor', 'capacity', 'region'];
    for (const field of requiredFields) {
      if (!formFields[field]) {
        throw createError({
          statusCode: 400,
          statusMessage: `Missing required field: ${field}`
        });
      }
    }

    const now = new Date();
    
    // Create the event first
    const eventData = await useDrizzle()
      .insert(events)
      .values({
        name: formFields.name,
        description: formFields.description,
        startDate: formFields.startDate,
        endDate: formFields.endDate,
        location: formFields.location,
        eventType: formFields.eventType,
        outdoor: formFields.outdoor,
        capacity: formFields.capacity,
        region: formFields.region,
        createdAt: formFields.createdAt || now,
        updatedAt: formFields.updatedAt || now,
      })
      .returning({ insertedId: events.id });

    const eventId = eventData[0].insertedId;
    
    // Upload files to blob storage and create media records
    const uploadedFiles: any[] = [];
    const mediaIds: number[] = [];

    if (files.length > 0) {
      for (const file of files) {
        const ext = file.filename.split(".").pop();
        const randomUUID = crypto.randomUUID();
        const uuidName = `${randomUUID}.${ext}`;
        const uint8Data = new Uint8Array(file.data);

        const blob = await hubBlob().put(uuidName, uint8Data, {
          addRandomSuffix: true,
          prefix: "media",
        });

        if (blob && blob.pathname && blob.contentType) {
          const mediaData = await useDrizzle()
            .insert(medias)
            .values({
              name: randomUUID,
              description: `Media for event: ${formFields.name}`,
              type: blob.contentType,
              blobPath: blob.pathname,
              eventId: eventId,
              createdAt: now,
              updatedAt: now,
            })
            .returning({ insertedId: medias.id });

          if (mediaData[0].insertedId) {
            mediaIds.push(mediaData[0].insertedId);
            uploadedFiles.push({
              id: mediaData[0].insertedId,
              ...blob
            });
          }
        }
      }

      // Update event with media reference
      if (mediaIds.length > 0) {
        await useDrizzle()
          .update(events)
          .set({
            media: JSON.stringify(mediaIds),
            updatedAt: now
          })
          .where(eq(events.id, eventId));
      }
    }

    return {
      status: 200,
      eventId,
      uploadedFiles,
      mediaCount: files.length,
      message: "Event created successfully with media"
    };

  } catch (error) {
    console.error("Error creating event:", error);
    throw createError({
      statusCode: 500,
      statusMessage: error instanceof Error ? error.message : "Failed to create event"
    });
  }
});