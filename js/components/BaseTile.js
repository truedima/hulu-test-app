const getImageURL = (item, isLandscape, w, h) => {};

const createBaseTile = (item, config) => {
  const state = { imgError: false };
  const {landscape, width, height} = config;

  const imgElement = generateHTMLElement({
    type: "img",
    attributes: [
      ["src", landscape ? item.landscapeImg : item.portraitImg],
    ],
    props: [
      [
        "onerror",
        function () {
          this.onerror = null;
          state.imgError = true;
          this.src = "default-stil.gif";
        },
      ],
    ],
  });

  const tileElement = generateHTMLElement({
    type: "div",
    classes: ["tile"],
    attributes: [["style", `width: ${width}px; height: ${height}px;`]],
    children: [imgElement],
  });

  return {
    tile: tileElement,
    img: imgElement,
    state,
  };
};
