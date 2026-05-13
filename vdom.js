/**
 * Create a virtual node
 * @param {string} tag
 * @param {object} props
 * @param {Array} children
 */
export function h(tag, props, ...children) {
    return {
        tag,
        props: props || {},
        children: children.flat().map(child =>
            child === null || child === undefined || child === false
                ? null
                : typeof child === 'string' || typeof child === 'number'
                ? { tag: 'text', text: child }
                : child
        ).filter(child => child !== null)
    };
}

/**
 * Create real DOM element from virtual node
 */
export function createRealNode(vnode) {
    if (vnode.tag === 'text') {
        return document.createTextNode(vnode.text);
    }

    const el = document.createElement(vnode.tag);

    // Apply props
    updateProps(el, vnode.props, {});

    // Append children
    vnode.children.forEach(child => {
        el.appendChild(createRealNode(child));
    });

    vnode.el = el;
    return el;
}

/**
 * Basic diffing/patching algorithm
 */
export function patch(parent, newVNode, oldVNode, index = 0) {
    if (!oldVNode) {
        parent.appendChild(createRealNode(newVNode));
    } else if (!newVNode) {
        parent.removeChild(parent.childNodes[index]);
    } else if (changed(newVNode, oldVNode)) {
        parent.replaceChild(createRealNode(newVNode), parent.childNodes[index]);
    } else if (newVNode.tag !== 'text') {
        const el = parent.childNodes[index];
        updateProps(el, newVNode.props, oldVNode.props);
        
        const newChildren = newVNode.children;
        const oldChildren = oldVNode.children;
        const newLength = newChildren.length;
        const oldLength = oldChildren.length;

        // Patch overlapping children
        for (let i = 0; i < Math.min(newLength, oldLength); i++) {
            patch(el, newChildren[i], oldChildren[i], i);
        }

        // Add remaining new children
        if (newLength > oldLength) {
            for (let i = oldLength; i < newLength; i++) {
                el.appendChild(createRealNode(newChildren[i]));
            }
        } 
        // Remove remaining old children
        else if (newLength < oldLength) {
            for (let i = oldLength - 1; i >= newLength; i--) {
                el.removeChild(el.childNodes[i]);
            }
        }
    }
}

function updateProps(el, newProps, oldProps = {}) {
    // Remove old props
    for (const key in oldProps) {
        if (!(key in newProps)) {
            if (key.startsWith('on')) {
                const eventName = key.slice(2).toLowerCase();
                el.removeEventListener(eventName, oldProps[key]);
            } else {
                el.removeAttribute(key);
            }
        }
    }

    // Add/Update new props
    for (const key in newProps) {
        if (newProps[key] !== oldProps[key]) {
            if (key.startsWith('on')) {
                const eventName = key.slice(2).toLowerCase();
                if (oldProps[key]) el.removeEventListener(eventName, oldProps[key]);
                el.addEventListener(eventName, newProps[key]);
            } else {
                if (key === 'value' || key === 'checked') {
                    el[key] = newProps[key];
                } else {
                    el.setAttribute(key === 'className' ? 'class' : key, newProps[key]);
                }
            }
        }
    }
}

function changed(node1, node2) {
    return (
        typeof node1 !== typeof node2 ||
        node1.tag !== node2.tag ||
        (node1.tag === 'text' && node1.text !== node2.text)
    );
}
