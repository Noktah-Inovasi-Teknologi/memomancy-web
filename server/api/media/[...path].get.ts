import { readFile, stat } from 'fs/promises';
import { join } from 'path';
import { createReadStream } from 'fs';

/**
 * API endpoint to serve media files
 * - Production: Serves from R2 with range support for video streaming
 * - Development: Serves from /public folder
 */
export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, "path");

  if (!path) {
    throw createError({
      statusCode: 400,
      message: "File path is required",
    });
  }

  try {
    // Check if we're in development mode
    const isDev = process.env.NODE_ENV === 'development' || !process.env.CLOUDFLARE_ACCOUNT_ID;

    if (isDev) {
      // Development mode: Serve from public folder
      const publicPath = join(process.cwd(), 'public', path);

      try {
        const stats = await stat(publicPath);

        if (!stats.isFile()) {
          throw createError({
            statusCode: 404,
            message: `File not found: ${path}`,
          });
        }

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

        // Check for Range header (needed for video streaming)
        const rangeHeader = getHeader(event, "range");

        if (rangeHeader) {
          // Parse range header: "bytes=start-end"
          const parts = rangeHeader.replace(/bytes=/, "").split("-");
          const start = parseInt(parts[0], 10);
          const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
          const contentLength = end - start + 1;

          // Set 206 Partial Content status
          setResponseStatus(event, 206);
          setHeader(event, "Content-Range", `bytes ${start}-${end}/${stats.size}`);
          setHeader(event, "Content-Length", contentLength.toString());
          setHeader(event, "Content-Type", contentType);
          setHeader(event, "Accept-Ranges", "bytes");
          setHeader(event, "Cache-Control", "public, max-age=31536000, immutable");

          // Read and return the file chunk
          const fileBuffer = await readFile(publicPath);
          return fileBuffer.slice(start, end + 1);
        } else {
          // Full file request
          setHeader(event, "Content-Type", contentType);
          setHeader(event, "Content-Length", stats.size.toString());
          setHeader(event, "Accept-Ranges", "bytes");
          setHeader(event, "Cache-Control", "public, max-age=31536000, immutable");

          const fileBuffer = await readFile(publicPath);
          return fileBuffer;
        }
      } catch (error: any) {
        if (error.code === 'ENOENT') {
          throw createError({
            statusCode: 404,
            message: `File not found: ${path}`,
          });
        }
        throw error;
      }
    }

    // Production mode: Serve from R2
    const r2 = event.context.cloudflare?.env?.R2;

    if (!r2) {
      throw createError({
        statusCode: 500,
        message: "R2 storage is not configured",
      });
    }

    // Check for Range header (needed for video streaming)
    const rangeHeader = getHeader(event, "range");
    let object;

    if (rangeHeader) {
      // Parse range header: "bytes=start-end"
      const parts = rangeHeader.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : undefined;

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
      object = await r2.get(path);

      if (!object) {
        throw createError({
          statusCode: 404,
          message: `File not found: ${path}`,
        });
      }

      setHeader(event, "Content-Length", object.size.toString());
    }

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
    return object.body;
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: `Error loading media: ${error.message}`,
    });
  }
});
