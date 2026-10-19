<script setup lang="ts">
import {TabType} from "@/types/tab.ts";

import AppPage from "@layouts/AppPage.vue";

const tabsList: TabType[] = [
  {
    key: 'users',
    label: 'Пользователи',
    url: '/ve_fox/users',
  },
  {
    key: 'videos',
    label: 'Видео',
    url: '/ve_fox/video',
  },
  {
    key: 'channels',
    label: 'Каналы',
    url: '/ve_fox/channels',
  },
  {
    key: 'sections',
    label: 'Плейлисты',
    url: '/ve_fox/sections',
  },
]
</script>

<template>

  <AppPage :tabs-list="tabsList"/>

</template>