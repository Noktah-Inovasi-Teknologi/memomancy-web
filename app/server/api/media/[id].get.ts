export default eventHandler(async (event) => {
  const { id } = getQuery(event) as any;

  return hubBlob().get(id);
  // return id;
});
