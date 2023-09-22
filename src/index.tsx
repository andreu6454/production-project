import {createRoot} from 'react-dom/client';
import App from "./app/App";
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "@/app/providers/ThemeProvider";
import '@/app/styles/index.scss'
import "@/shared/config/i18n/i18n";
import {ErrorBoundary} from "@/app/providers/ErrorBoundary";
import React from "react";
import {StoreProvider} from "@/app/providers/StoreProvider";
import {ForceUpdateProvider} from "@/shared/lib/render/forceUpdate";


const container = document.getElementById('root');
if (!container) {
    throw new Error('Контейнер root не найден!')
}
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<ErrorBoundary>
        <BrowserRouter>
            <StoreProvider>
                <ForceUpdateProvider>
                    <ThemeProvider>
                        <App/>
                    </ThemeProvider>
                </ForceUpdateProvider>
            </StoreProvider>
        </BrowserRouter>
    </ErrorBoundary>,
);


export {Theme} from "@/shared/const/theme";