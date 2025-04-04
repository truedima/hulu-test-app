interface ElementSchema {
    type: string;
    classes?: string[];
    attributes?: [string, string][];
    children?: ElementSchema[];
    text?: string;
  }
  
  function _generateHTMLElement(d: Document, schema: ElementSchema): HTMLElement {
    const newElement = d.createElement(schema.type);
  
    if (schema.classes?.length) {
      newElement.classList.add(...schema.classes);
    }
  
    schema.attributes?.forEach(([key, val]) => {
      newElement.setAttribute(key, val);
    });
  
    schema.children?.forEach((childSchema) => {
      newElement.appendChild(_generateHTMLElement(d, childSchema));
    });
  
    if (schema.text) {
      newElement.innerText = schema.text;
    }
  
    return newElement;
  }
  