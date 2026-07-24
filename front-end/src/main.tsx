import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./styles/index.scss";
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
