import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import TaskManager from './TaskManager/TaskManager'

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<React.StrictMode>
    <div className="bg">
        <TaskManager/>
    </div> 
</React.StrictMode>)

reportWebVitals();
