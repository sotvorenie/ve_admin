import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import AppLayout from "@layouts/AppLayout.vue";

import auth from "@pages/auth.vue";
import index from "@pages/index.vue";
import user from "@pages/user.vue";

import veMusic from "@pages/ve_music/index.vue";
import veMusicUsers from "@pages/ve_music/users/index.vue";
import veMusicUser from "@pages/ve_music/users/[id].vue";
import veMusicMusic from "@pages/ve_music/music/index.vue";
import veMusicMusicDetail from "@pages/ve_music/music/[id].vue";
import veMusicMusicCreate from "@pages/ve_music/music/create.vue";
import veMusicArtists from "@pages/ve_music/artists/index.vue";
import veMusicArtist from "@pages/ve_music/artists/[id].vue";
import veMusicArtistCreate from "@pages/ve_music/artists/create.vue";
import veMusicGenres from "@pages/ve_music/genres/index.vue";
import veMusicGenre from "@pages/ve_music/genres/[id].vue";
import veMusicGenreCreate from "@pages/ve_music/genres/create.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/auth',
        name: 'auth',
        component: auth,
    },
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '',
                name: 'main',
                component: index,
                meta: {
                    title: 'Главная',
                },
            },
            {
                path: '/user',
                name: 'user',
                component: user,
                meta: {
                    title: 'Пользователь',
                },
            },
            {
                path: '/ve_music',
                name: 've_music',
                component: veMusic,
                meta: {
                    title: 'veMusic',
                },
                children: [
                    {
                        path: 'users',
                        name: 've_music_users',
                        component: veMusicUsers,
                        meta: {
                            title: 'Пользователи veMusic',
                        },
                    },
                    {
                        path: 'music',
                        name: 've_music_music',
                        component: veMusicMusic,
                        meta: {
                            title: 'Аудио veMusic',
                        },
                    },
                    {
                        path: 'artists',
                        name: 've_music_artists',
                        component: veMusicArtists,
                        meta: {
                            title: 'Исполнители veMusic',
                        },
                    },
                    {
                        path: 'genres',
                        name: 've_music_genres',
                        component: veMusicGenres,
                        meta: {
                            title: 'Жанры veMusic',
                        },
                    },
                ]
            },
            {
                path: '/ve_music/users/:id',
                name: 've_music_user',
                component: veMusicUser,
                meta: {
                    title: 'Пользователь VeMusic',
                },
            },
            {
                path: '/ve_music/music/:id',
                name: 've_music_music_detail',
                component: veMusicMusicDetail,
                meta: {
                    title: 'Аудио VeMusic',
                },
            },
            {
                path: '/ve_music/music/create',
                name: 've_music_music_create',
                component: veMusicMusicCreate,
                meta: {
                    title: 'Новая музыка для VeMusic',
                },
            },
            {
                path: '/ve_music/artists/:id',
                name: 've_music_artist',
                component: veMusicArtist,
                meta: {
                    title: 'Исполнитель VeMusic',
                },
            },
            {
                path: '/ve_music/artists/create',
                name: 've_music_artist_create',
                component: veMusicArtistCreate,
                meta: {
                    title: 'Новый исполнитель для VeMusic',
                },
            },
            {
                path: '/ve_music/genres/:id',
                name: 've_music_genre',
                component: veMusicGenre,
                meta: {
                    title: 'Жанр VeMusic',
                },
            },
            {
                path: '/ve_music/genres/create',
                name: 've_music_genre_create',
                component: veMusicGenreCreate,
                meta: {
                    title: 'Новый жанр для VeMusic',
                },
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router