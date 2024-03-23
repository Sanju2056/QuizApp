import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { App } from './App'
{/* <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> */}
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;1,100&family=Roboto:ital,wght@0,100;0,300;0,400;1,700&display=swap" rel="stylesheet"></link>

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  
  </React.StrictMode>,
)
