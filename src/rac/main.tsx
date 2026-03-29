import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './tokens.css';
import './styles.css';
import { App } from './app';

const app = document.querySelector('#app');

if (!app) {
    throw new Error('Expected #app container in the host HTML page.');
}

const root = createRoot(app);
root.render(
    <StrictMode>
        <App />
    </StrictMode>,
);
