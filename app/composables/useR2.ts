/**
 * Composable for R2 bucket operations
 */
export function useR2() {
  /**
   * List all objects in the R2 bucket
   */
  const listObjects = async () => {
    try {
      const response = await $fetch("/api/r2/list");
      return response;
    } catch (error: any) {
      console.error("Error fetching R2 objects:", error);
      throw error;
    }
  };

  return {
    listObjects,
  };
}
