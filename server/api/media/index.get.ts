// export default defineEventHandler(async (event) => {
//   const query: any = getQuery(event);
//   if (query.id) {
//     return hubBlob().serve(event, query.id);
//   } else {
//     const { blobs } = await hubBlob().list();
//     console.log(blobs);
//     return blobs;
//   }
// });
