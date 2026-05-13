/**
 * Simple reactive state management
 */
export function createState(initialState, onUpdate) {
    const handler = {
        get(target, key) {
            const value = target[key];
            if (typeof value === 'object' && value !== null) {
                return new Proxy(value, handler);
            }
            if (typeof value === 'function') {
                return value.bind(target);
            }
            return value;
        },
        set(target, key, value) {
            target[key] = value;
            onUpdate();
            return true;
        },
        deleteProperty(target, key) {
            delete target[key];
            onUpdate();
            return true;
        }
    };

    return new Proxy(initialState, handler);
}
