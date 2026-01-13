/**
 * Debug endpoint to check R2 binding and Cloudflare context
 */
export default defineEventHandler(async (event) => {
  try {
    console.log("=== R2 Debug Start ===");

    // Check if cloudflare context exists
    const hasCloudflare = !!event.context.cloudflare;
    console.log("Has Cloudflare context:", hasCloudflare);

    if (!hasCloudflare) {
      return {
        success: false,
        error: "No Cloudflare context found",
        hint: "Make sure nitro-cloudflare-dev is properly configured",
        context: event.context,
      };
    }

    // Check if env exists
    const hasEnv = !!event.context.cloudflare?.env;
    console.log("Has env:", hasEnv);

    if (!hasEnv) {
      return {
        success: false,
        error: "No env found in Cloudflare context",
        cloudflareContext: event.context.cloudflare,
      };
    }

    // Check if R2 binding exists
    const r2 = event.context.cloudflare?.env?.R2;
    const hasR2 = !!r2;
    console.log("Has R2 binding:", hasR2);

    if (!hasR2) {
      return {
        success: false,
        error: "R2 binding not found",
        availableBindings: Object.keys(event.context.cloudflare.env),
        hint: "Make sure R2 binding is configured in wrangler.toml",
      };
    }

    // Try to list objects
    console.log("Attempting to list R2 objects...");
    const listed = await r2.list({ limit: 5 });

    console.log("R2 list successful:", {
      objectCount: listed.objects.length,
      truncated: listed.truncated,
    });

    return {
      success: true,
      hasCloudflare,
      hasEnv,
      hasR2,
      r2Info: {
        objectCount: listed.objects.length,
        truncated: listed.truncated,
        objects: listed.objects.map((obj) => ({
          key: obj.key,
          size: obj.size,
        })),
      },
      message: "R2 binding is working correctly!",
    };
  } catch (error: any) {
    console.error("=== R2 Debug Error ===");
    console.error("Error:", error);

    return {
      success: false,
      error: error.message,
      errorName: error.name,
      stack: error.stack?.split("\n").slice(0, 5).join("\n"),
    };
  }
});
