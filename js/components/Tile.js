function createTile(item, type) {
  if (type === "EXPANDABLE") {
    return createExpandableTile(item, CAROUSEL_CONFIG[type]);
  }
  return createResizableTile(item, CAROUSEL_CONFIG[type]);
}
