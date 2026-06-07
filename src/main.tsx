import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@/shared/i18n/config'
import App from './App.tsx'

// Dev-only: react-grab lets you select elements to inspect / hand to an agent.
if (import.meta.env.DEV) {
  import('react-grab').then((m) => m.init()).catch(() => {})
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
