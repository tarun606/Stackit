import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LoginPage from "../src/components/Login/Login"
import StackIt from "../src/components/Home/Home"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StackIt/>
  </StrictMode>,
)
