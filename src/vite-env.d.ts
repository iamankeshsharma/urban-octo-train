/// <reference types="vite/client" />

interface Turnstile {
    render: (element: string | HTMLElement, options?: any) => string;
    reset: (widgetId: string) => void;
    getResponse: (widgetId: string) => string | undefined;
    remove: (widgetId: string) => void;
}

declare const turnstile: Turnstile;
