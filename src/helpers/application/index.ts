import { defaultTheme, languages, storageKeys, themes } from '../../common/constants/application'
import type { Language, Theme } from '../../common/types/application'

export function getStoredLanguage(): Language {
  const storedLanguage = localStorage.getItem(storageKeys.language)
  return languages.find((language) => language === storedLanguage) ?? 'uk'
}

export function getStoredTheme(): Theme {
  const storedTheme = localStorage.getItem(storageKeys.theme)
  return themes.find((theme) => theme === storedTheme) ?? defaultTheme
}
