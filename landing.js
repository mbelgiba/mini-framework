import { h } from './vdom.js';

export function Landing(state) {
    return h('div', { class: 'landing-page' },
        h('section', { class: 'landing-hero' },
            h('h1', {}, 'Mini-Framework'),
            h('p', {}, 'Легковесный, реактивный JavaScript-фреймворк, созданный с нуля. Virtual DOM, управление состоянием и роутинг — все в одном флаконе.'),
            h('div', { class: 'cta-group' },
                h('a', { href: '#/todo', class: 'btn btn-primary' }, 'Попробовать TodoMVC'),
                h('a', { href: '#/docs', class: 'btn', style: 'color: white; margin-left: 1rem;' }, 'Документация')
            )
        ),
        h('section', { class: 'features' },
            h('div', { class: 'feature-card' },
                h('h3', {}, 'Virtual DOM'),
                h('p', {}, 'Эффективное манипулирование DOM с использованием алгоритма сравнения (diffing), который обновляет только то, что необходимо.')
            ),
            h('div', { class: 'feature-card' },
                h('h3', {}, 'Реактивное Состояние'),
                h('p', {}, 'Встроенное управление состоянием на базе ES6 Proxy. Обновите данные, и интерфейс подстроится автоматически.')
            ),
            h('div', { class: 'feature-card' },
                h('h3', {}, 'Hash Роутер'),
                h('p', {}, 'Простая и эффективная система навигации для создания современных Single Page Applications (SPA).')
            ),
            h('div', { class: 'feature-card' },
                h('h3', {}, 'Кастомные События'),
                h('p', {}, 'Чистый API для обработки пользовательских взаимодействий без лишнего шаблонного кода нативных слушателей.')
            )
        )
    );
}
