import { h } from '../../framework/vdom.js';
import { state as globalState } from '../../store.js';

export function TodoApp(state) {
    const filteredTodos = state.todos.filter(todo => {
        if (state.filter === 'active') return !todo.completed;
        if (state.filter === 'completed') return todo.completed;
        return true;
    });

    const activeCount = state.todos.filter(t => !t.completed).length;

    const addTodo = (e) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
            globalState.todos.push({
                id: Date.now(),
                title: e.target.value.trim(),
                completed: false
            });
            e.target.value = '';
        }
    };

    const toggleTodo = (id) => {
        const todo = globalState.todos.find(t => t.id === id);
        if (todo) todo.completed = !todo.completed;
    };

    const removeTodo = (id) => {
        globalState.todos = globalState.todos.filter(t => t.id !== id);
    };

    const clearCompleted = () => {
        globalState.todos = globalState.todos.filter(t => !t.completed);
    };

    const startEditing = (id) => {
        globalState.editing = id;
    };

    const saveEdit = (e, id) => {
        if (e.key === 'Enter') {
            const todo = globalState.todos.find(t => t.id === id);
            if (todo) {
                todo.title = e.target.value.trim();
                globalState.editing = null;
            }
        } else if (e.key === 'Escape') {
            globalState.editing = null;
        }
    };

    return h('div', { class: 'todo-container' },
        h('header', { class: 'todo-header' },
            h('h2', {}, 'задачи'),
            h('input', {
                class: 'new-todo',
                placeholder: 'Что нужно сделать?',
                onKeyup: addTodo,
                autofocus: true
            })
        ),
        h('ul', { class: 'todo-list' },
            ...filteredTodos.map(todo => 
                h('li', { class: `todo-item ${todo.completed ? 'completed' : ''} ${state.editing === todo.id ? 'editing' : ''}` },
                    state.editing === todo.id 
                        ? h('input', {
                            class: 'edit-input',
                            value: todo.title,
                            onKeyup: (e) => saveEdit(e, todo.id),
                            onBlur: () => globalState.editing = null,
                            autofocus: true
                        })
                        : h('div', { style: 'display: flex; align-items: center; width: 100%;' },
                            h('input', {
                                type: 'checkbox',
                                class: 'toggle',
                                checked: todo.completed ? 'checked' : '',
                                onChange: () => toggleTodo(todo.id)
                            }),
                            h('label', { onDblclick: () => startEditing(todo.id) }, todo.title),
                            h('button', {
                                class: 'destroy',
                                onClick: () => removeTodo(todo.id)
                            }, '×')
                        )
                )
            )
        ),
        state.todos.length > 0 ? h('footer', { class: 'todo-footer' },
            h('span', {}, `${activeCount} осталось`),
            h('div', { class: 'filters' },
                h('a', { href: '#/todo', class: state.filter === 'all' ? 'selected' : '' }, 'Все'),
                h('a', { href: '#/active', class: state.filter === 'active' ? 'selected' : '' }, 'Активные'),
                h('a', { href: '#/completed', class: state.filter === 'completed' ? 'selected' : '' }, 'Завершенные')
            ),
            h('button', {
                class: 'btn',
                style: 'font-size: 0.8rem; background: transparent; color: var(--text-muted);',
                onClick: clearCompleted
            }, 'Очистить завершенные')
        ) : h('div', { style: 'display:none' })
    );
}
