import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// @ts-ignore
import {App} from './App.jsx';
import './index.css'

<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;1,100&family=Roboto:ital,wght@0,100;0,300;0,400;1,700&display=swap" rel="stylesheet"/>

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
<App/>
    </BrowserRouter>
  </React.StrictMode>
)
