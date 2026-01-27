/**
 * R2 Health Check Endpoint
 * Lists objects in the R2 bucket to verify connectivity and inspect key structure.
 *
 * Query params:
 *   - prefix: filter objects by prefix (e.g. "2025/")
 *   - limit: max number of objects to return (default 20)
 *   - test: a specific key to test r2.get() on (e.g. "2025/4889166C/photo/4889166C_photo_1.jpg")
 */
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const prefix = (query.prefix as string) || undefined;
  const limit = parseInt((query.limit as string) || "20", 10);
  const testKey = (query.test as string) || undefined;

  const result: Record<string, unknown> = {
    status: "ok",
    environment: process.env.NODE_ENV || "unknown",
    hasCloudflareContext: !!event.context.cloudflare,
    hasR2Binding: false,
    objects: [] as { key: string; size: number }[],
    testResult: null as null | { key: string; found: boolean; size?: number },
  };

  try {
    const r2 = event.context.cloudflare?.env?.R2;

    if (!r2) {
      result.status = "error";
      result.error = "R2 binding not available";
      result.hint = "Check wrangler.toml [[r2_buckets]] binding and that the bucket is bound in Cloudflare dashboard.";
      return result;
    }

    result.hasR2Binding = true;

    // List objects
    const listed = await r2.list({ prefix, limit });
    result.objects = listed.objects.map((obj: any) => ({
      key: obj.key,
      size: obj.size,
    }));
    result.truncated = listed.truncated;
    result.objectCount = listed.objects.length;

    // Test specific key
    if (testKey) {
      const obj = await r2.get(testKey);
      result.testResult = {
        key: testKey,
        found: !!obj,
        size: obj?.size,
      };
    }
  } catch (error: any) {
    result.status = "error";
    result.error = error.message;
  }

  return result;
});
