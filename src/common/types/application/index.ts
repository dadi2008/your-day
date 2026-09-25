import type { Translation } from '../../interfaces/application'

export type Language = 'uk' | 'en'
export type Theme = 'light' | 'dark'
export type TimeOfDay = 'morning' | 'day' | 'evening' | 'night'

export type LocalizedTranslations = Record<Language, Translation>
