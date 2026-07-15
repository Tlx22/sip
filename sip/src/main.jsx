import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './input.css' // Targets your Tailwind configuration directly

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)