/**
 * API endpoint to serve media files from R2
 * Fetches files from R2 and streams to client
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
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

  // Check if R2 is configured
  console.log("R2 Configuration check:", {
    hasEndpoint: !!config.r2Endpoint,
    endpoint: config.r2Endpoint?.substring(0, 30) + "...",
    hasAccessKey: !!config.r2AccessKeyId,
    accessKey: config.r2AccessKeyId?.substring(0, 10) + "...",
    hasSecretKey: !!config.r2SecretAccessKey,
    bucketName: config.r2BucketName,
  });

  if (!config.r2Endpoint || !config.r2AccessKeyId) {
    console.error("R2 not configured properly");
    throw createError({
      statusCode: 500,
      message: "R2 storage is not configured",
    });
  }

  try {
    console.log("Attempting to fetch from R2:", path);
    // Fetch from R2
    const response = await getFromR2(path);
    console.log("R2 response received:", {
      hasBody: !!response.Body,
      contentType: response.ContentType,
      contentLength: response.ContentLength,
    });

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
    console.log("Converting stream to buffer...");
    const chunks: Uint8Array[] = [];
    const stream = response.Body;

    if (stream) {
      let chunkCount = 0;
      // @ts-ignore - AWS SDK stream types
      for await (const chunk of stream) {
        chunks.push(chunk);
        chunkCount++;
        if (chunkCount % 100 === 0) {
          console.log(`Processed ${chunkCount} chunks`);
        }
      }
      console.log(`Total chunks processed: ${chunkCount}`);
    }

    console.log("Concatenating buffer...");
    const buffer = Buffer.concat(chunks);
    console.log("Buffer size:", buffer.length);
    console.log("=== Media Request Success ===");
    return buffer;
  } catch (error: any) {
    console.error("=== Media Request Failed ===");
    console.error("Error fetching from R2:", {
      path,
      errorName: error.name,
      errorMessage: error.message,
      errorCode: error.code,
      stack: error.stack?.split('\n').slice(0, 5).join('\n'),
    });

    throw createError({
      statusCode: 500,
      message: `Error loading media: ${error.message}`,
    });
  }
});
