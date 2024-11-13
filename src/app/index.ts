import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue'
import '~/assets/globals.css'
import App from './app.vue'

createApp(App).use(VueQueryPlugin).mount('#app')
