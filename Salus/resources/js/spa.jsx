import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import SpaApp from './SpaApp';

const rootElement = document.getElementById('app');

if (rootElement) {
    createRoot(rootElement).render(
        <React.StrictMode>
            <BrowserRouter basename="/app">
                <SpaApp />
            </BrowserRouter>
        </React.StrictMode>,
    );
}
