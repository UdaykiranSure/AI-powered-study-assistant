import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FileProvider } from './context/fileContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <FileProvider>
    <App />
    </FileProvider>
    </BrowserRouter>
  </StrictMode>
)
