<script setup lang="ts">
import {ref} from "vue";

import {TabType} from "@/types/tab.ts";

import Tabs from "@/components/common/Tabs.vue";

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

const activeTab = ref<TabType | null>(null)
</script>

<template>

  <div class="ve-music">
    <Tabs :items="tabsList" v-model="activeTab"/>

    <router-view/>
  </div>

</template>