export default eventHandler(async (event) => {
  const { id } = getRouterParams(event);

  return hubBlob().get(id);
});
