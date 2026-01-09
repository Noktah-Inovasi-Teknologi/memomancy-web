/**
 * API endpoint for uploading media files
 * - In development: Returns local file path (files should be manually placed in /public)
 * - In production: Uploads to Cloudflare R2
 */
export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    const formData = await readMultipartFormData(event);

    if (!formData || formData.length === 0) {
      return {
        status: 400,
        message: "No files uploaded",
      };
    }

    const uploadedFiles: Array<{ filename: string; url: string }> = [];

    for (const file of formData) {
      if (!file.filename) continue;

      const ext = file.filename.split(".").pop();
      const randomUUID = crypto.randomUUID();
      const filename = `${randomUUID}.${ext}`;

      // Determine folder based on content type
      let folder = "media";
      if (file.type?.startsWith("video/")) {
        folder = "videos";
      } else if (file.type?.startsWith("image/")) {
        folder = "images";
      }

      const key = `${folder}/${filename}`;

      // If R2 is configured (production), upload to R2
      if (config.public.r2BaseUrl) {
        try {
          const result = await uploadToR2(
            file.data,
            key,
            file.type || "application/octet-stream"
          );

          uploadedFiles.push({
            filename: filename,
            url: result.url,
          });
        } catch (error) {
          console.error("Failed to upload to R2:", error);
          throw error;
        }
      } else {
        // Development mode: Return local path
        // Note: In dev, files should be manually placed in /public folder
        const localUrl = `/${folder}/${filename}`;
        uploadedFiles.push({
          filename: filename,
          url: localUrl,
        });

        console.log(
          `Development mode: File would be saved as ${localUrl}. Please manually place the file in /public${localUrl}`
        );
      }
    }

    return {
      status: 200,
      files: uploadedFiles,
      message: config.public.r2BaseUrl
        ? "Files uploaded to R2 successfully"
        : "Files processed (development mode - manually place in /public folder)",
    };
  } catch (error: any) {
    console.error("Upload error:", error);
    return {
      status: 500,
      message: error.message || "Failed to upload files",
    };
  }
});
