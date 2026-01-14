/**
 * Composable for managing media URLs
 * - Production: API endpoint fetches from R2
 * - Development: API endpoint fetches from /public folder
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

    // Always use API endpoint (auto-detects R2 or local /public folder)
    return `/api/media/${path}`;
  };

  /**
   * Get URL for a video file
   * Assumes videos are stored in /public/videos folder locally and R2 in production
   */
  const getVideoUrl = (filename: string): string => {
    return getMediaUrl(filename, "videos");
  };

  /**
   * Get URL for an image file
   * Assumes images are stored in /public/images folder locally and R2 in production
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
