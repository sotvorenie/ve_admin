import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import IndexPage from "@pages/IndexPage.vue";
import AuthPage from "@pages/AuthPage.vue";
import VeMusicPage from "@pages/VeMusicPage.vue";
import UserPage from "@pages/UserPage.vue";
import AppLayout from "@layouts/AppLayout.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/auth',
        name: 'auth',
        component: AuthPage
    },
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '',
                name: 'main',
                component: IndexPage
            },
            {
                path: '/user',
                name: 'user',
                component: UserPage
            },
            {
                path: '/ve_music',
                name: 've_music',
                component: VeMusicPage
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router