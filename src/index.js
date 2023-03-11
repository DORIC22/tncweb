import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./hoc/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <AuthProvider>
        <App />
    </AuthProvider>
);