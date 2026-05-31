import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

createInertiaApp({
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx')
        ),

    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});

//app.jsx is the main entry point of the React frontend. 
// It initializes the Inertia.js application, loads the 
// appropriate React page component based on the route 
// requested from Laravel, and renders it in the browser. 
// This file enables seamless navigation between pages without
//  full page reloads, 
// creating a modern single-page application experience.