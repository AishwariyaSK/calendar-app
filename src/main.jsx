import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import CalendarContext from './context/CalendarContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CalendarContext>
      <App />
    </CalendarContext>
  </StrictMode>,
)
