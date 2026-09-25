import type { Language, Theme, TimeOfDay } from '../../types/application'

export const languages = ['uk', 'en'] as const satisfies readonly Language[]
export const themes = ['light', 'dark'] as const satisfies readonly Theme[]
export const defaultTheme: Theme = 'dark'

export const storageKeys = {
  language: 'quotesapp-language',
  theme: 'quotesapp-theme',
} as const

export const dateLocales: Record<Language, string> = {
  uk: 'uk-UA',
  en: 'en-US',
}

export const dateFormatOptions: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
}

export const timeOfDayThresholds: Record<Exclude<TimeOfDay, 'night'>, number> = {
  morning: 5,
  day: 11,
  evening: 17,
}

export const timeOfDayRefreshInterval = 60_000
