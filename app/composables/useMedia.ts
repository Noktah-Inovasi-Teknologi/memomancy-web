/**
 * Composable for managing media URLs
 * Always uses API endpoint that fetches from R2 in both dev and production
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

    // Always use API endpoint to fetch from R2
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
