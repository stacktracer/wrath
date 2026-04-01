import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './styles/index.css';
import { App } from './app';
import { installMuiXLicenseKey } from './license';

installMuiXLicenseKey();

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
