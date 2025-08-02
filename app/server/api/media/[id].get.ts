export default eventHandler(async (event) => {
  const { id } = getQuery(event) as any;

  return hubBlob().serve(event, id);
  // return id;
});
