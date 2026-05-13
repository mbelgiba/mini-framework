import { createState } from './framework/state.js';

// Initial state
const initialState = {
    view: '/',
    todos: JSON.parse(localStorage.getItem('todos') || '[]'),
    filter: 'all',
    editing: null
};

// We will initialize this in main.js
export let state = null;

export function initStore(updateCallback) {
    state = createState(initialState, updateCallback);
    return state;
}
