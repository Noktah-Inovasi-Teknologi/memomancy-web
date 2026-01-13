/**
 * Test endpoint to fetch a specific video from R2 and list all contents
 */
export default defineEventHandler(async (event) => {
  try {
    console.log("=== R2 Test Fetch Start ===");

    // Access the R2 binding
    const r2 = event.context.cloudflare?.env?.R2;

    if (!r2) {
      console.error("R2 binding not found");
      return {
        success: false,
        error: "R2 binding not found",
        context: {
          hasCloudflare: !!event.context.cloudflare,
          hasEnv: !!event.context.cloudflare?.env,
          envKeys: event.context.cloudflare?.env ? Object.keys(event.context.cloudflare.env) : [],
        },
      };
    }

    console.log("R2 binding found");
    console.log("Listing ALL objects in bucket to see exact paths...");

    // First, list ALL objects to see what's actually in the bucket
    const listed = await r2.list({ limit: 1000 });

    console.log(`Found ${listed.objects.length} objects in bucket`);

    const bucketContents = listed.objects.map((obj) => ({
      key: obj.key,
      size: obj.size,
      uploaded: obj.uploaded,
    }));

    // Try different path variations for Tia video
    const pathsToTry = [
      "videos/Tia.mp4",
      "Tia.mp4",
      "videos/tia.mp4",
      "tia.mp4",
    ];

    const results: any = {
      bucketContents,
      totalObjects: listed.objects.length,
      truncated: listed.truncated,
      testResults: [],
    };

    for (const path of pathsToTry) {
      console.log(`Trying to fetch: ${path}`);
      const obj = await r2.get(path);

      results.testResults.push({
        path,
        found: !!obj,
        size: obj?.size,
      });

      if (obj) {
        console.log(`✓ Found at: ${path}`);
      }
    }

    return {
      success: true,
      ...results,
    };
  } catch (error: any) {
    console.error("=== R2 Test Fetch Error ===");
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack?.split("\n").slice(0, 10),
    });

    return {
      success: false,
      error: error.message,
      errorName: error.name,
      errorStack: error.stack?.split("\n").slice(0, 5),
    };
  }
});
