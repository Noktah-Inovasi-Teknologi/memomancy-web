import { medias } from "../../database/schema";

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);
  let uploadedFiles: any[] = [];
  if (formData) {
    for (const file of formData) {
      if (file.filename) {
        const ext = file.filename.split(".").pop();
        const randomUUID = crypto.randomUUID();
        const uuidName = `${randomUUID}.${ext}`;
        const now = new Date();
        const uint8Data = new Uint8Array(file.data);

        const blob = await hubBlob().put(uuidName, uint8Data, {
          addRandomSuffix: true,
          prefix: "media",
        });
        if (blob && blob.pathname && blob.contentType) {
          const data = await useDrizzle()
            .insert(medias)
            .values({
              name: randomUUID,
              description: "Uploaded media file",
              type: blob.contentType,
              blobPath: blob.pathname,
              createdAt: now,
              updatedAt: now,
            })
            .returning({ insertedId: medias.id });
          if (data[0].insertedId) {
            uploadedFiles.push(blob);
          }
        }
      }
    }
    return {
      status: 200,
      files: uploadedFiles,
      message: "Files uploaded successfully",
    };
  }
  return { status: 400, message: "No files uploaded" };
});
