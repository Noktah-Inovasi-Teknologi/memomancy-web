/**
 * API endpoint to list all items in R2 bucket
 * Uses Cloudflare R2 binding from wrangler.toml
 */
export default defineEventHandler(async (event) => {
  try {
    // Access the R2 binding from Cloudflare context
    const r2 = event.context.cloudflare?.env?.R2;

    if (!r2) {
      throw createError({
        statusCode: 500,
        message: "R2 binding not found. Make sure R2 is configured in wrangler.toml",
      });
    }

    console.log("Listing objects from R2 bucket...");

    // List all objects in the bucket
    const listed = await r2.list();

    // Format the response
    const objects = listed.objects.map((obj) => ({
      key: obj.key,
      size: obj.size,
      uploaded: obj.uploaded,
      httpEtag: obj.httpEtag,
    }));

    console.log(`Found ${objects.length} objects in R2 bucket`);

    return {
      success: true,
      count: objects.length,
      truncated: listed.truncated,
      objects,
    };
  } catch (error: any) {
    console.error("Error listing R2 objects:", error);
    throw createError({
      statusCode: 500,
      message: `Error listing R2 objects: ${error.message}`,
    });
  }
});
