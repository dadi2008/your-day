import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'

const application = createApp(App)

application.use(createPinia())
application.mount('#app')
