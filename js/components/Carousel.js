const createCarouselNode = (row, type) => {
  const { outer_height, outer_width, shift } = CAROUSEL_CONFIG[type];
  const focusItems = [];

  const children = row.items.map((item) => {
    const { domElement, focusElement } = createTile(item, type);
    focusItems.push(focusElement);
    return domElement;
  });

  children.push({
    type: "div",
    classes: ["carousel-delimiter"],
  });

  const carouselInner = generateHTMLElement({
    type: "div",
    classes: ["carousel-inner"],
    attributes: [["style", `height: ${outer_height}px;`]],
    children,
  });

  const outerContainer = generateHTMLElement({
    type: "div",
    attributes: [["style", `height: ${outer_height+90}px;`]],
    children: [
      {
        type: "div",
        children: [
          {
            type: "h2",
            classes: ["carousel-header"],
            text: row.title,
          },
        ],
      },
      {
        type: "div",
        classes: ["carousel-container"],
        children: [carouselInner],
      },
    ],
  });

  return {
    domElement: outerContainer,
    focusElement: {
      direction: "row",
      loop: 1, // 0 - no loop | 1 - loop from max to zero | 2 - loop from zero to max | 3 - loop any direction
      items: focusItems,
      focusIndex: 0,
      focus: function () {
        if (shift) {
          const offset = this.focusIndex * outer_width;
          carouselInner.style.transform = `translateX(${-offset}px)`;
        }
      },
      focusLost: function () {},
    },
  };
};
