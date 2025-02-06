import CharacterPage from '@/dragonball/pages/CharacterPage.vue'
import HomePage from '@/shared/pages/HomePage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/characters'
        },
        {
            path: '/characters',
            name: 'Home',
            component: HomePage
        },
        {
            path: '/characters/:id',
            name: 'Character',
            component: CharacterPage
        }
    ],
})

export default router
