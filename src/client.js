import ReactDOM from 'react-dom';
import React from "react";
import { BrowserRouter } from 'react-router-dom';
import AppComponent from './application/components/app';

const jsx = (
    <BrowserRouter>
        <AppComponent />
    </BrowserRouter>
)
ReactDOM.render(jsx, document.getElementById('mount-point'));