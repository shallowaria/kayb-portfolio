import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { resources, type Lang } from '@/shared/i18n/resources'

function detectLang(): Lang {
  const stored = localStorage.getItem('lang')
  if (stored === 'en' || stored === 'zh') return stored
  return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

void i18n.use(initReactI18next).init({
  // We read structured content via useContent(); i18next here drives language
  // state, persistence and React re-renders. A minimal resource map satisfies it.
  resources: {
    en: { translation: {} },
    zh: { translation: {} },
  },
  lng: detectLang(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('lang', lng)
  document.documentElement.lang = lng
})

document.documentElement.lang = i18n.language

export { resources }
export default i18n
