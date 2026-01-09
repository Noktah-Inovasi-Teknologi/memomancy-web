/**
 * API endpoint to serve media files
 * - In development: Serves from /public folder (handled by Nuxt)
 * - In production: Fetches from R2 and streams to client
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

  // In development (no R2 configured), let Nuxt serve from /public
  if (!config.r2Endpoint || !config.r2AccessKeyId) {
    // Redirect to public folder - Nuxt will handle it
    return sendRedirect(event, `/${path}`, 302);
  }

  try {
    // Fetch from R2 in production
    const response = await getFromR2(path);

    if (!response.Body) {
      throw createError({
        statusCode: 404,
        message: "File not found",
      });
    }

    // Set appropriate headers
    setHeader(event, "Content-Type", response.ContentType || "application/octet-stream");
    setHeader(event, "Cache-Control", "public, max-age=31536000, immutable");

    if (response.ContentLength) {
      setHeader(event, "Content-Length", response.ContentLength.toString());
    }

    // Stream the file
    const stream = response.Body as ReadableStream;
    return stream;
  } catch (error: any) {
    console.error("Error fetching from R2:", error);

    // If R2 fails, try to fallback to public folder
    if (process.env.NODE_ENV === "development") {
      return sendRedirect(event, `/${path}`, 302);
    }

    throw createError({
      statusCode: 404,
      message: "File not found",
    });
  }
});
