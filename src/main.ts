import './main.css';
import { renderApp } from './app';

const app = document.querySelector('#app');

if (!app) {
    throw new Error('Expected #app container in index.html.');
}

const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');

function syncTheme(): void {
    document.body.classList.toggle('theme-dark', prefersDarkTheme.matches);
}

syncTheme();
prefersDarkTheme.addEventListener('change', syncTheme);

renderApp(app);
