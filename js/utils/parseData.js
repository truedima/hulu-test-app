const processItem = (item) => {
  return {
    title: item.visuals.headline,
    premiereYear: item.entity_metadata.premiere_date.substring(0, 4),
    description: item.visuals.body || "",
    genre: item.entity_metadata.genre_names.join(", "),
    rating: item.entity_metadata.rating?.code || "",
    landscapeImg:
      item.visuals.artwork.horizontal_tile.image.path +
      "&size=640x360&format=jpeg",
    heroPosterImageURL:
    item.visuals.artwork.horizontal_tile.image.path +
    "&size=1920x1080&format=jpeg",
  portraitImg:
      item.visuals.artwork.vertical_tile.image.path +
      "&size=200x300&format=jpeg",
  };
};

const processRow = (row) => {
  return {
    items: row.items.map(processItem),
    title: row.name,
    id: row.id,
  };
};

const processData = (data) => {
  const processedRows = [];
  const emptyRows = [];
  data.components.forEach((row) => {
    if (row.items.length) {
      processedRows.push(processRow(row));
    } else if (row.id) {
      emptyRows.push(row.id);
    }
  });

  return { processedRows, emptyRows };
};
