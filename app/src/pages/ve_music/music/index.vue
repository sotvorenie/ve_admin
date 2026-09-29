<script setup lang="ts">
import {onBeforeMount, ref} from "vue";

import {ListItemType} from "@/types/list.ts";
import {MusicListType} from "@/types/music.ts";

import {musicColsStyle, musicHeadItems} from "@data/music.ts";

import {apiGetAllMusic} from "@api/veMusic/music.ts";

import {useSignal} from "@composables/useSignal.ts";
import {showError} from "@utils/modals.ts";

import List from "@common/List.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();
import usePageStore from "@store/usePageStore.ts";
const pageStore = usePageStore();
import useSearchStore from "@store/useSearchStore.ts";
const searchStore = useSearchStore();

const signal = useSignal()

const music = ref<ListItemType[]>([])

const page = ref(1)
const total = ref(0)

const isLoading = ref(true)

const setToStore = (music: any) => {
  veMusicStore.currentMusic = music
}

const getMusic = async () => {
  isLoading.value = true

  try {
    const response: MusicListType = await apiGetAllMusic(searchStore.searchName, -1, -1, page.value, 30, signal)

    if (response) {
      page.value = response.page
      total.value = response.total
      music.value = response.music.map(m => ({
        url: `/ve_music/music/${m.id}`,
        info: {
          ...m,
          artistId: m.artists.map(a => a.id)
        }
      }))
    }
  } catch (err: any) {
    await showError(
        'Ошибка загрузки данных',
        `Не удалось загрузить список музыки... Ошибка: ${err.detail}`
    )
  } finally {
    isLoading.value = false
  }
}

onBeforeMount(() => {
  pageStore.createBtnInfo = {
    label: 'Добавить музыку',
    to: '/ve_music/music/create',
  }
  searchStore.searchFunc = () => getMusic()

  getMusic()

})
</script>

<template>

  <List v-model:page="page"
        :items="music"
        :total="total"
        :head-items="musicHeadItems"
        :cols-style="musicColsStyle"
        :store-func="setToStore"
        :is-loading="isLoading"
  />

</template>