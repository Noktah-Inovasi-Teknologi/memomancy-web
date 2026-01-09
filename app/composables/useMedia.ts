/**
 * Composable for managing media URLs across environments
 * - In development: Uses local /public folder directly
 * - In production: Uses API endpoint that fetches from R2
 */
export function useMedia() {
  /**
   * Get the full URL for a media file
   * @param filename - The filename (e.g., "Tia.mp4")
   * @param folder - Optional folder prefix (e.g., "videos", "images")
   * @returns Full URL to the media file
   */
  const getMediaUrl = (filename: string, folder?: string): string => {
    const path = folder ? `${folder}/${filename}` : filename;

    // Always use API endpoint - it handles both dev and prod
    // In dev: API redirects to /public folder
    // In prod: API fetches from R2 and streams
    return `/api/media/${path}`;
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
   * Check if we're in production mode
   */
  const isProduction = computed(() => import.meta.env.PROD);

  return {
    getMediaUrl,
    getVideoUrl,
    getImageUrl,
    isProduction,
  };
}
