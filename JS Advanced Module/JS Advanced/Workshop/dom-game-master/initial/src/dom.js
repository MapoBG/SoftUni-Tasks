function createElement(type, attributes = {}, ...content) {
    const element = document.createElement(type);

    for (const attr in attributes) {
        if (attr.substring(0, 2) == "on") {
            element.addEventListener(attr.slice(2).toLowerCase(), attributes[attr]);
        } else {
            element[attr] = attributes[attr];
        }
    }

    content.forEach(e => {
        if (typeof e == "string" || typeof e == "number") {
            const node = document.createTextNode(e);
            element.appendChild(node);
        } else {
            element.appendChild(e);
        }
    });

    return element;
}