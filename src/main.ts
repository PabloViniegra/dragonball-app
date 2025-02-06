import './main.css'
import 'vue-toast-notification/dist/theme-bootstrap.css';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ToastPlugin from 'vue-toast-notification';
import App from './App.vue'
import router from './router'
import { MotionPlugin } from '@vueuse/motion'
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)
VueQueryPlugin.install(app, {
    queryClientConfig: {
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5,
                retry: 2,
                refetchOnWindowFocus: false,
                retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
            }
        }
    }
})
app.use(createPinia())
app.use(router)
app.use(ToastPlugin)
app.use(MotionPlugin)
app.mount('#app')
