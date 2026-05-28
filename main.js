import { patch } from './vdom.js';
import { Router } from './router.js';
import { Landing } from './landing.js';
import { TodoApp } from './todo.js';
import { Docs } from './docs.js';
import { initStore, state } from './store.js';

const appRoot = document.getElementById('app');
let oldVNode = null;

// Render function
function render() {
    console.log('Rendering view:', state?.view);
    if (!state) return;

    let newVNode;
    
    try {
        if (state.view === '/todo') {
            newVNode = TodoApp(state);
        } else if (state.view === '/docs') {
            newVNode = Docs(state);
        } else {
            newVNode = Landing(state);
        }

        patch(appRoot, newVNode, oldVNode);
        oldVNode = newVNode;
    } catch (err) {
        console.error('Render error:', err);
    }

    // Persist todos
    if (state.todos) {
        localStorage.setItem('todos', JSON.stringify(state.todos));
    }
}

// Create reactive state
initStore(render);

// Router setup
const routes = {
    '/': () => { state.view = '/'; },
    '/todo': () => { 
        console.log('Route: Todo');
        state.view = '/todo'; 
        state.filter = 'all';
    },
    '/docs': () => { state.view = '/docs'; },
    '/active': () => { 
        state.view = '/todo';
        state.filter = 'active';
    },
    '/completed': () => {
        state.view = '/todo';
        state.filter = 'completed';
    }
};

const router = new Router(routes, appRoot);
router.init();

// FORCE INITIAL RENDER
render();
