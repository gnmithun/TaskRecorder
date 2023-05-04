import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Routing from './Routes/Routes';
import { CookiesProvider } from 'react-cookie';
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <CookiesProvider>
        <React.StrictMode>
            <div className="bg">
                <Routing/>
            </div> 
        </React.StrictMode>
    </CookiesProvider>
)

reportWebVitals();