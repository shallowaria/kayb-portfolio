import { en } from '@/shared/i18n/locales/en'
import { zh } from '@/shared/i18n/locales/zh'

export const resources = { en, zh }

export type Lang = keyof typeof resources

export const LANGS: Lang[] = ['zh', 'en']
