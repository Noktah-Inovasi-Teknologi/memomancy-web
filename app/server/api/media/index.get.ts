export default defineEventHandler(async (event) => {
  const { blobs } = await hubBlob().list();
  console.log(blobs);
  return blobs;
});
