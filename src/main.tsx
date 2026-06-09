import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Self-hosted variable fonts (no Google CDN — faster for users in China).
// Each ships every subset gated by unicode-range, so only Latin is fetched.
import '@fontsource-variable/inter'
import '@fontsource-variable/fraunces'
import '@fontsource-variable/fraunces/standard-italic.css'
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
