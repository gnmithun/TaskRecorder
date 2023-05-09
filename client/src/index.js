"use client"
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Routing from './Routes/Routes';
import { CookiesProvider } from 'react-cookie';
import ErrorBoundary from './Common/errorBoundary';

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
        <React.StrictMode>
            <ErrorBoundary>
                <CookiesProvider>
                <div className="bg">
                    <Routing/>
                </div> 
                </CookiesProvider>
            </ErrorBoundary>
        </React.StrictMode>
)

reportWebVitals();