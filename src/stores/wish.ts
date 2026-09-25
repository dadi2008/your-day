import { defineStore } from 'pinia'
import { storageKeys } from 'common/constants/application'
import { wishes } from 'common/constants/wishes'
import type { Language } from 'common/types/application'
import { getStoredLanguage, getStoredTheme } from 'helpers/application'
import { createWish, getWishByIndex } from 'helpers/wishes'

export const useWishStore = defineStore('wish', {
  state: () => {
    const language = getStoredLanguage()

    return {
      language,
      theme: getStoredTheme(),
      wish: createWish(wishes, language),
    }
  },
  actions: {
    initialize() {
      this.applyTheme()
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
      this.wish = getWishByIndex(wishes, language, this.wish.index)
    },
    showNextWish() {
      this.wish = createWish(wishes, this.language, this.wish.index)
    },
  },
})
