/**
 * API endpoint to serve media files from R2
 * Uses Cloudflare R2 binding instead of AWS SDK
 */
export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, "path");

  console.log("=== Media Request Start ===");
  console.log("Path requested:", path);

  if (!path) {
    console.error("No path provided");
    throw createError({
      statusCode: 400,
      message: "File path is required",
    });
  }

  try {
    // Access the R2 binding from Cloudflare context
    const r2 = event.context.cloudflare?.env?.R2;

    if (!r2) {
      console.error("R2 binding not found");
      throw createError({
        statusCode: 500,
        message: "R2 storage is not configured. Make sure R2 binding is set in wrangler.toml",
      });
    }

    console.log("Attempting to fetch from R2:", path);

    // Get the object from R2
    const object = await r2.get(path);

    if (!object) {
      console.error("Object not found:", path);
      throw createError({
        statusCode: 404,
        message: `File not found: ${path}`,
      });
    }

    console.log("R2 object retrieved:", {
      key: object.key,
      size: object.size,
      httpEtag: object.httpEtag,
    });

    // Determine content type based on file extension
    const ext = path.split(".").pop()?.toLowerCase();
    const contentTypeMap: Record<string, string> = {
      mp4: "video/mp4",
      webm: "video/webm",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
    };
    const contentType = contentTypeMap[ext || ""] || "application/octet-stream";

    // Set appropriate headers
    setHeader(event, "Content-Type", contentType);
    setHeader(event, "Cache-Control", "public, max-age=31536000, immutable");
    setHeader(event, "Content-Length", object.size.toString());
    setHeader(event, "ETag", object.httpEtag);

    // Return the body as array buffer
    console.log("Streaming R2 object...");
    const arrayBuffer = await object.arrayBuffer();
    console.log("=== Media Request Success ===");

    return arrayBuffer;
  } catch (error: any) {
    console.error("=== Media Request Failed ===");
    console.error("Error fetching from R2:", {
      path,
      errorName: error.name,
      errorMessage: error.message,
      stack: error.stack?.split("\n").slice(0, 5).join("\n"),
    });

    throw createError({
      statusCode: 500,
      message: `Error loading media: ${error.message}`,
    });
  }
});
