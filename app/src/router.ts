import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import auth from "@pages/auth.vue";
import index from "@pages/index.vue";
import user from "@pages/user.vue";
import veMusic from "@pages/ve_music/index.vue";
import veMusicUsers from "@pages/ve_music/users/index.vue";
import veMusicUser from "@pages/ve_music/users/[id].vue";
import AppLayout from "@layouts/AppLayout.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/auth',
        name: 'auth',
        component: auth
    },
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '',
                name: 'main',
                component: index
            },
            {
                path: '/user',
                name: 'user',
                component: user
            },
            {
                path: '/ve_music',
                name: 've_music',
                component: veMusic,
                children: [
                    {
                        path: 'users',
                        name: 've_music_users',
                        component: veMusicUsers
                    },
                ]
            },
            {
                path: '/ve_music/users/:id',
                name: 've_music_user',
                component: veMusicUser
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router