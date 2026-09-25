<script setup lang="ts">
import { computed } from 'vue'
import { languages, themes } from 'common/constants/application'
import type { Translation } from 'common/interfaces/application'
import type { Language, Theme } from 'common/types/application'
import './AppHeader.css'

const props = defineProps<{
  language: Language
  theme: Theme
  copy: Translation
}>()

const emit = defineEmits<{
  selectLanguage: [language: Language]
  toggleTheme: []
}>()

const isLightTheme = computed(() => props.theme === themes[0])
</script>

<template>
  <header class="topbar">
    <a class="brand" href="/" :aria-label="copy.appName">{{ copy.appName }}</a>

    <div class="controls">
      <div class="language-switcher" :aria-label="copy.language">
        <button
          v-for="languageOption in languages"
          :key="languageOption"
          type="button"
          :class="{ active: language === languageOption }"
          :aria-pressed="language === languageOption"
          @click="emit('selectLanguage', languageOption)"
        >
          {{ languageOption.toUpperCase() }}
        </button>
      </div>

      <button class="theme-button" type="button" :aria-label="isLightTheme ? copy.dark : copy.light" @click="emit('toggleTheme')">
        <span aria-hidden="true">{{ isLightTheme ? '☾' : '☀' }}</span>
      </button>
    </div>
  </header>
</template>
