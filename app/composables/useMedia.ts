/**
 * Composable for managing media URLs across environments
 * - In development: Uses local /public folder
 * - In production: Uses API endpoint that fetches from R2
 */
export function useMedia() {
  const config = useRuntimeConfig();

  /**
   * Get the full URL for a media file
   * @param filename - The filename (e.g., "Tia.mp4")
   * @param folder - Optional folder prefix (e.g., "videos", "images")
   * @returns Full URL to the media file
   */
  const getMediaUrl = (filename: string, folder?: string): string => {
    const path = folder ? `${folder}/${filename}` : filename;

    // If R2 is configured, use the API endpoint
    // The API will fetch from R2 in production or redirect to /public in dev
    if (config.r2Endpoint || import.meta.env.PROD) {
      return `/api/media/${path}`;
    }

    // Direct path to public folder for development
    return `/${path}`;
  };

  /**
   * Get URL for a video file
   * Assumes videos are stored in /videos folder locally and R2
   */
  const getVideoUrl = (filename: string): string => {
    return getMediaUrl(filename, "videos");
  };

  /**
   * Get URL for an image file
   * Assumes images are stored in /images folder locally and R2
   */
  const getImageUrl = (filename: string): string => {
    return getMediaUrl(filename, "images");
  };

  /**
   * Check if we're using R2 (production) or local files (development)
   */
  const isUsingR2 = computed(() => !!config.r2Endpoint);

  return {
    getMediaUrl,
    getVideoUrl,
    getImageUrl,
    isUsingR2,
  };
}
