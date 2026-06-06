import { useTranslation } from 'react-i18next'

import { resources, type Lang } from '@/shared/i18n/resources'
import type { Content } from '@/shared/i18n/types'

/**
 * Returns the typed content tree for the active language. Reactive: it re-runs
 * on language change because useTranslation subscribes to i18next.
 */
export function useContent(): Content {
  const { i18n } = useTranslation()
  const lang = i18n.language as Lang
  return resources[lang] ?? resources.en
}

/** Active language + a setter, for the language switcher. */
export function useLanguage() {
  const { i18n } = useTranslation()
  const current = (i18n.language as Lang) in resources ? (i18n.language as Lang) : 'en'
  return {
    current,
    setLanguage: (lang: Lang) => void i18n.changeLanguage(lang),
  }
}
