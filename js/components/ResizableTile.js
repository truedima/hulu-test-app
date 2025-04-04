const createResizableTile = (item, config) => {
  const {tile, img, state} = createBaseTile(item, config);

  return {
    domElement: tile,
    focusElement: {
      direction: "none",
      focus: function () {
        tile.classList.add("focused");
        appDataStore.heroModalInfo.heroImage = item.heroPosterImageURL;
        appDataStore.heroModalInfo.title = item.title;
        appDataStore.heroModalInfo.description = item.description;
        if (state.imgError) {
            img.src = "default-anim.gif";
        }
      },
      focusLost: function () {
        tile.classList.remove("focused");
        if (state.imgError) {
            img.src = "default-stil.gif";
        }
      },
    },
  };
};
