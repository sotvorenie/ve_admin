import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import IndexPage from "@pages/IndexPage.vue";
import AuthPage from "@pages/AuthPage.vue";
import VeMusicPage from "@pages/VeMusicPage.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'main',
        component: IndexPage
    },
    {
        path: '/auth',
        name: 'auth',
        component: AuthPage
    },
    {
        path: '/ve_music',
        name: 've_music',
        component: VeMusicPage
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router