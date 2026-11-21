/**
 * Canonical W3C DOM Builder from JSON Specification.
 * Compatible with @keshavsoft/json-to-tag conventions.
 */
export const buildSpecElement = ({ inSpec }) => {
    if (!inSpec) return null;

    // Leaf text or number node
    if (typeof inSpec === 'string' || typeof inSpec === 'number') {
        return document.createTextNode(String(inSpec));
    }

    // Node instance passthrough
    if (typeof Node !== 'undefined' && inSpec instanceof Node) {
        return inSpec;
    }

    // Element node
    const el = document.createElement(inSpec.tagName);

    // Attributes dictionary
    if (inSpec.attributes && typeof inSpec.attributes === 'object') {
        for (const [key, val] of Object.entries(inSpec.attributes)) {
            if (val !== undefined && val !== null) {
                el.setAttribute(key, String(val));
            }
        }
    }

    // Leaf textContent
    if (inSpec.textContent !== undefined && inSpec.textContent !== null) {
        el.textContent = String(inSpec.textContent);
    }

    // Children array traversal
    if (Array.isArray(inSpec.children)) {
        for (const child of inSpec.children) {
            const childNode = buildSpecElement({ inSpec: child });
            if (childNode) {
                el.appendChild(childNode);
            }
        }
    }

    return el;
};

export default buildSpecElement;
