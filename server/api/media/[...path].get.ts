/**
 * API endpoint to serve media files from R2
 * Supports HTTP Range requests for video streaming
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

    // Check for Range header (needed for video streaming)
    const rangeHeader = getHeader(event, "range");
    console.log("Range header:", rangeHeader);

    let object;

    if (rangeHeader) {
      // Parse range header: "bytes=start-end"
      const parts = rangeHeader.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : undefined;

      console.log("Range request:", { start, end });

      // Get object with range
      object = await r2.get(path, {
        range: end !== undefined
          ? { offset: start, length: end - start + 1 }
          : { offset: start }
      });

      if (!object) {
        throw createError({
          statusCode: 404,
          message: `File not found: ${path}`,
        });
      }

      // Set 206 Partial Content status
      setResponseStatus(event, 206);

      // Calculate content range
      const rangeEnd = end !== undefined ? end : object.size - 1;
      const contentLength = rangeEnd - start + 1;

      setHeader(event, "Content-Range", `bytes ${start}-${rangeEnd}/${object.size}`);
      setHeader(event, "Content-Length", contentLength.toString());
    } else {
      // Normal request without range
      console.log("Full file request");
      object = await r2.get(path);

      if (!object) {
        throw createError({
          statusCode: 404,
          message: `File not found: ${path}`,
        });
      }

      setHeader(event, "Content-Length", object.size.toString());
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

    // Set common headers
    setHeader(event, "Content-Type", contentType);
    setHeader(event, "Accept-Ranges", "bytes");
    setHeader(event, "Cache-Control", "public, max-age=31536000, immutable");
    setHeader(event, "ETag", object.httpEtag);

    // Stream the body
    console.log("=== Media Request Success ===");
    return object.body;
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
