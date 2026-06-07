import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@shared/router'
import { useAuthStore } from '@shared/stores/authStore'
import { useBrandingStore } from '@shared/stores/brandingStore'
import { setupAuthInterceptor } from '@shared/utils/axios'
import './style.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

const brandingStore = useBrandingStore()
brandingStore.loadCachedBranding()

setupAuthInterceptor(useAuthStore())

app.use(router)

app.mount('#app')