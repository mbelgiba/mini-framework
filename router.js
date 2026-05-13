/**
 * Simple Hash-based Router
 */
export class Router {
    constructor(routes, rootElement) {
        this.routes = routes;
        this.rootElement = rootElement;
        this.currentPath = window.location.hash.slice(1) || '/';
        
        window.addEventListener('hashchange', () => {
            this.currentPath = window.location.hash.slice(1) || '/';
            this.resolve();
        });

        // Handle clicking links even if the hash is the same
        document.addEventListener('click', (e) => {
            const anchor = e.target.closest('a');
            if (anchor && anchor.hash) {
                const path = anchor.hash.slice(1) || '/';
                if (path === this.currentPath) {
                    this.resolve(); // Re-trigger the same route
                }
            }
        });
    }

    resolve() {
        console.log('Resolving path:', this.currentPath);
        const route = this.routes[this.currentPath] || this.routes['/'];
        if (route) {
            route();
        }
    }

    navigate(path) {
        window.location.hash = path;
    }

    init() {
        this.resolve();
    }
}
