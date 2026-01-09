/**
 * API endpoint to serve media files from R2
 * Fetches files from R2 and streams to client
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const path = getRouterParam(event, "path");

  if (!path) {
    throw createError({
      statusCode: 400,
      message: "File path is required",
    });
  }

  // Check if R2 is configured
  if (!config.r2Endpoint || !config.r2AccessKeyId) {
    console.error("R2 not configured:", {
      hasEndpoint: !!config.r2Endpoint,
      hasAccessKey: !!config.r2AccessKeyId,
    });
    throw createError({
      statusCode: 500,
      message: "R2 storage is not configured",
    });
  }

  try {
    // Fetch from R2
    const response = await getFromR2(path);

    if (!response.Body) {
      throw createError({
        statusCode: 404,
        message: "File not found in R2",
      });
    }

    // Set appropriate headers
    setHeader(event, "Content-Type", response.ContentType || "application/octet-stream");
    setHeader(event, "Cache-Control", "public, max-age=31536000, immutable");

    if (response.ContentLength) {
      setHeader(event, "Content-Length", response.ContentLength.toString());
    }

    // Convert the body to a buffer and return it
    // This works better with Cloudflare Workers/Nitro
    const chunks: Uint8Array[] = [];
    const stream = response.Body;

    if (stream) {
      // @ts-ignore - AWS SDK stream types
      for await (const chunk of stream) {
        chunks.push(chunk);
      }
    }

    const buffer = Buffer.concat(chunks);
    return buffer;
  } catch (error: any) {
    console.error("Error fetching from R2:", {
      path,
      error: error.message,
      stack: error.stack,
    });

    throw createError({
      statusCode: 500,
      message: `Error loading media: ${error.message}`,
    });
  }
});
