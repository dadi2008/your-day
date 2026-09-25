<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { dateFormatOptions, dateLocales, timeOfDayRefreshInterval } from 'common/constants/application'
import { translations } from 'common/constants/translations'
import AppHeader from 'components/AppHeader/AppHeader.vue'
import DailyWish from 'components/DailyWish/DailyWish.vue'
import MorningLight from 'components/MorningLight/MorningLight.vue'
import ThoughtStream from 'components/ThoughtStream/ThoughtStream.vue'
import { useWishStore } from 'stores/wish'
import { getTimeOfDay } from 'utils/application'

const wishStore = useWishStore()
const { language, theme, wish } = storeToRefs(wishStore)
const currentDate = ref(new Date())

let timeOfDayInterval: number | undefined

const currentCopy = computed(() => translations[language.value])

const formattedDate = computed(() =>
  new Intl.DateTimeFormat(dateLocales[language.value], dateFormatOptions).format(currentDate.value),
)

const timeOfDay = computed(() => getTimeOfDay(currentDate.value.getHours()))

watch(language, (currentLanguage) => {
  document.documentElement.lang = currentLanguage
  document.title = translations[currentLanguage].appName
}, { immediate: true })

onMounted(() => {
  wishStore.initialize()
  timeOfDayInterval = window.setInterval(() => { currentDate.value = new Date() }, timeOfDayRefreshInterval)
})

onBeforeUnmount(() => {
  if (timeOfDayInterval !== undefined) window.clearInterval(timeOfDayInterval)
})
</script>

<template>
  <main class="page-shell" :data-time-of-day="timeOfDay">
    <MorningLight />
    <ThoughtStream :language="language" :theme="theme" />
    <AppHeader
      :language="language"
      :theme="theme"
      :copy="currentCopy"
      @select-language="wishStore.setLanguage"
      @toggle-theme="wishStore.toggleTheme"
    />
    <DailyWish
      :formatted-date="formattedDate"
      :copy="currentCopy"
      :wish="wish"
      @show-next-wish="wishStore.showNextWish"
    />
  </main>
</template>
