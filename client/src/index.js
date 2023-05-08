"use client"
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Routing from './Routes/Routes';
import { CookiesProvider } from 'react-cookie';
import { ErrorBoundary } from "react-error-boundary";

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <ErrorBoundary fallback={ <div> <h1> An Error </h1> </div>} >
    <CookiesProvider>
        <React.StrictMode>
            <div className="bg">
                <Routing/>
            </div> 
        </React.StrictMode>
    </CookiesProvider>
    </ErrorBoundary>
)

reportWebVitals();