import { patch } from './src/framework/vdom.js';
import { Router } from './src/framework/router.js';
import { Landing } from './src/apps/landing/landing.js';
import { TodoApp } from './src/apps/todo-mvc/todo.js';
import { Docs } from './src/apps/docs/docs.js';
import { initStore, state } from './src/store.js';

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
