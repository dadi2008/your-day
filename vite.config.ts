import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const sourceDirectory = decodeURIComponent(new URL('./src', import.meta.url).pathname)

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      common: `${sourceDirectory}/common`,
      components: `${sourceDirectory}/components`,
      data: `${sourceDirectory}/data`,
      helpers: `${sourceDirectory}/helpers`,
      stores: `${sourceDirectory}/stores`,
      utils: `${sourceDirectory}/utils`,
    },
  },
})
