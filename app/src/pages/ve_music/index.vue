<script setup lang="ts">
import {ref} from "vue";

import {TabType} from "@/types/tab.ts";

import Tabs from "@/components/common/Tabs.vue";

import ButtonUi from "@ui/ButtonUi.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();

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
    <div class="flex justify-between gap-20 pb-6">
      <Tabs :items="tabsList" v-model="activeTab"/>

      <RouterLink v-if="veMusicStore.createBtnInfo?.to"
                  :to="veMusicStore.createBtnInfo.to"
      >
        <ButtonUi>{{veMusicStore.createBtnInfo.label}}</ButtonUi>
      </RouterLink>
    </div>

    <router-view/>
  </div>

</template>