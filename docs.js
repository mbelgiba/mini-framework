import { h } from './vdom.js';

export function Docs(state) {
    return h('div', { class: 'docs-container', style: 'max-width: 800px; margin: 4rem auto; padding: 2rem; background: var(--surface); border-radius: 1rem;' },
        h('a', { href: '#/', class: 'btn', style: 'margin-bottom: 2rem; background: #334155;' }, '← На главную'),
        h('h1', { style: 'margin-bottom: 1.5rem; color: #818cf8;' }, 'Документация Mini-Framework'),
        h('section', { style: 'margin-bottom: 2rem;' },
            h('h2', { style: 'margin-bottom: 1rem;' }, 'Основные функции'),
            h('ul', { style: 'list-style: disc; padding-left: 1.5rem;' },
                h('li', {}, 'Virtual DOM для быстрого обновления интерфейса'),
                h('li', {}, 'Реактивное состояние через Proxy'),
                h('li', {}, 'Хэш-роутинг для SPA'),
                h('li', {}, 'Кастомный API событий')
            )
        ),
        h('section', { style: 'margin-bottom: 2rem;' },
            h('h2', { style: 'margin-bottom: 1rem;' }, 'Пример создания элемента'),
            h('pre', { style: 'background: #0f172a; padding: 1rem; border-radius: 0.5rem; overflow-x: auto;' }, 
                h('code', {}, `h('button', { onClick: () => alert('Hello') }, 'Кликни меня')`)
            )
        )
    );
}
