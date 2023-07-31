import {render} from "react-dom";
import App from "./app/App";
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "app/providers/ThemeProvider";
import 'app/styles/index.scss'
import "shared/config/i18n/i18n";
import {ErrorBoundary} from "app/providers/ErrorBoundary";
import React from "react";
import {StoreProvider} from "app/providers/StoreProvider";


render(
    // @ts-ignore
    <ErrorBoundary>
        <StoreProvider>
            <BrowserRouter>
                <ThemeProvider>
                    <App/>
                </ThemeProvider>
            </BrowserRouter>
        </StoreProvider>
    </ErrorBoundary>,
    document.getElementById('root')
)