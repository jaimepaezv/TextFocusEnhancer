document.addEventListener("DOMContentLoaded", () => {
    const excludedElements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'b', 'strong'];

    function processTextNodes(element) {
        for (let child of element.childNodes) {
            if (child.nodeType === Node.TEXT_NODE) {
                const text = child.nodeValue;
                const newText = text.replace(/\b(\w+['’]?\w*)\b/g, (word) => {
                    if (word.length <= 3) {
                        return `<span class="my-highlight">${word.charAt(0)}</span>${word.slice(1)}`;
                    } else {
                        return `<span class="my-highlight">${word.slice(0, 2)}</span>${word.slice(2)}`;
                    }
                });
                if (newText !== text) {
                    const span = document.createElement('span');
                    span.innerHTML = newText;
                    child.parentNode.replaceChild(span, child);
                }
            } else if (child.nodeType === Node.ELEMENT_NODE && !excludedElements.includes(child.tagName.toLowerCase())) {
                processTextNodes(child);
            }
        }
    }

    const contentElements = document.querySelectorAll('.content');

    contentElements.forEach(element => {
        processTextNodes(element);
    });
});
