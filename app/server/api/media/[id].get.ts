export default eventHandler(async (event) => {
  const { id } = getRouterParams(event);

  return hubBlob().serve(event, id);
});
