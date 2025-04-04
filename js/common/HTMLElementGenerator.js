function generateHTMLElement(schema) {
  const newElement = document.createElement(schema.type);

  if (schema.classes?.length) {
    newElement.classList.add(...schema.classes);
  }

  schema.attributes?.forEach(([key, val]) => {
    newElement.setAttribute(key, val);
  });

  schema.props?.forEach(([prop, val]) => {
    newElement[prop] = val;
  });

  if (schema.text) {
    newElement.innerText = schema.text;
  }

  schema.children?.forEach((child) => {
    if (child instanceof Element) {
        newElement.appendChild(child)
    } else {
        newElement.appendChild(generateHTMLElement(child));
    }
  });

  return newElement;
}
