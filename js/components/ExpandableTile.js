const createExpandableTile = (item, config) => {
  const { tile, img, state } = createBaseTile(item, config);

  const {width, expanded_width} = config;

  return {
    domElement: tile,
    focusElement: {
      direction: "none",
      focus: function () {
        tile.classList.add("focused");
        tile.style.width = expanded_width + "px";

        appDataStore.heroModalInfo.heroImage = item.heroPosterImageURL;
        appDataStore.heroModalInfo.text = item.title;

        if (state.imgError) {
          img.src = "default-anim.gif";
        } else {
          img.src = item.landscapeImg;
        }
      },
      focusLost: function () {
        tile.style.width = width + "px";
        tile.classList.remove("focused");

        appDataStore.heroModalInfo.heroImage = "";
        appDataStore.heroModalInfo.text = "";

        if (state.imgError) {
          img.src = "default-stil.gif";
        } else {
          img.src = item.portraitImg;
        }
      },
    },
  };
};
