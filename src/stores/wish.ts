import { defineStore } from 'pinia'
import { storageKeys } from '../common/constants/application'
import { wishes } from '../common/constants/wishes'
import type { Language } from '../common/types/application'
import { getStoredLanguage, getStoredTheme } from '../helpers/application'
import { createWish } from '../helpers/wishes'

export const useWishStore = defineStore('wish', {
  state: () => ({
    language: getStoredLanguage(),
    theme: getStoredTheme(),
    wish: createWish(wishes, 'uk'),
  }),
  actions: {
    initialize() {
      this.applyTheme()
      this.showNextWish()
    },
    applyTheme() {
      document.documentElement.dataset.theme = this.theme
      document.documentElement.style.colorScheme = this.theme
    },
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem(storageKeys.theme, this.theme)
      this.applyTheme()
    },
    setLanguage(language: Language) {
      if (language === this.language) return
      this.language = language
      localStorage.setItem(storageKeys.language, language)
      this.showNextWish()
    },
    showNextWish() {
      this.wish = createWish(wishes, this.language, this.wish.text)
    },
  },
})
