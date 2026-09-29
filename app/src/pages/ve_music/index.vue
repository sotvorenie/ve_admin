<script setup lang="ts">
import {TabType} from "@/types/tab.ts";

import AppPage from "@layouts/AppPage.vue";

const tabsList: TabType[] = [
  {
    key: 'users',
    label: 'Пользователи',
    url: '/ve_music/users',
  },
  {
    key: 'music',
    label: 'Музыка',
    url: '/ve_music/music',
  },
  {
    key: 'genres',
    label: 'Жанры',
    url: '/ve_music/genres',
  },
  {
    key: 'artists',
    label: 'Исполнители',
    url: '/ve_music/artists',
  },
]
</script>

<template>

  <AppPage :tabs-list="tabsList"/>

</template>