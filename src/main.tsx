import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';
import './styles/tokens.css';
import './styles/base.css';
import './styles/tree.css';
import './styles/table.css';

const app = document.querySelector('#app');

if (!app) {
    throw new Error('Expected #app container in index.html.');
}

const root = createRoot(app);
root.render(
    <StrictMode>
        <App />
    </StrictMode>,
);
