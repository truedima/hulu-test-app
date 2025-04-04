const createButton = (title) => {
  const button = generateHTMLElement({
    type: "button",
    attributes: [["id", "button1"]],
    text: title,
  });
  return {
    button,
    focusElement: {
      direction: "none",
      focus: () => button.classList.add("focused"),
      focusLost: () => button.classList.remove("focused"),
    },
  };
};

const createImage = () =>
  generateHTMLElement({
    type: "img",
    props: [
      [
        "onerror",
        function () {
          this.src = "default-image.jpg";
        },
      ],
    ],
  });

const createDescription = () =>
  generateHTMLElement({
    type: "div",
    classes: ["description"],
  });

  const createTitle = () =>
  generateHTMLElement({
    type: "div",
    classes: ["title"],
  });

const createHeroModal = () => {
  const playButton = createButton("▶ Play");
  const rateButton = createButton("★ Rate");
  const addToWatchList = createButton("➕ Add To List");

  const modalImg = createImage();
  const modalDescription = createDescription();
  const modalTitle = createTitle();

  const modalSchema = {
    type: "div",
    classes: ["modal"],
    attributes: [["id", "modal"]],
    children: [
      modalImg,
      modalTitle,
      modalDescription,
      {
        type: "div",
        classes: ["modal-buttons"],
        children: [playButton.button, rateButton.button, addToWatchList.button],
      },
    ],
  };

  const modalElement = generateHTMLElement(modalSchema);

  const focusItems = [
    playButton.focusElement,
    rateButton.focusElement,
    addToWatchList.focusElement,
  ];

  return {
    modalElement,
    modalImg,
    modalDescription,
    modalTitle,
    modalFocusElement: {
      direction: "row",
      loop: 3,
      items: focusItems,
      focusIndex: 0,
      focus: function () {},
      focusLost: function () {},
    },
  };
};
