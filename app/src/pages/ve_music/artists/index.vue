<script setup lang="ts">
import {onBeforeMount, ref, watch} from "vue";

import {ListHead, ListItem} from "@/types/list.ts";

import {VeMusicArtistService} from "@api/veMusic/VeMusicArtistService.ts";

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

const headItems: ListHead[] = [
  {
    label: 'id',
    key: 'id',
    type: 'text',
  },
  {
    label: 'Дата создания',
    key: 'createdAt',
    type: 'date',
  },
  {
    label: 'Дата обновления',
    key: 'updatedAt',
    type: 'date',
  },
  {
    label: 'Аватарка',
    key: 'avatarUrl',
    type: 'avatar',
  },
  {
    label: 'Имя',
    key: 'name',
    type: 'text',
  },
]

const artists = ref<ListItem[]>([])

const page = ref(1)
const total = ref(0)

const isLoading = ref(true)

const setToStore = (artist: any) => {
  veMusicStore.currentArtist = artist
}

const getArtists = async () => {
  isLoading.value = true

  try {
    const response = await VeMusicArtistService.getArtists(searchStore.searchName, page.value, 30, signal)

    total.value = response.meta.total
    artists.value = response.data.map(artist => ({
      url: `/ve_music/artists/${artist.id}`,
      info: {
        ...artist
      }
    }))
  } catch (err: any) {
    await showError(
        'Ошибка загрузки данных',
        `Не удалось загрузить список исполнителей... Ошибка: ${err.detail}`
    )
  } finally {
    isLoading.value = false
  }
}

onBeforeMount(() => {
  pageStore.createBtnInfo = {
    label: 'Добавить исполнителя',
    to: '/ve_music/artists/create',
  }
  searchStore.searchFunc = () => getArtists()
})

watch(page, getArtists, { immediate: true })
</script>

<template>

  <List v-model:page="page"
        :items="artists"
        :total="total"
        :head-items="headItems"
        cols-style="4rem 9rem 9rem 10rem 1fr"
        :store-func="setToStore"
        :is-loading="isLoading"
  />

</template>