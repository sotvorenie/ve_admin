<script setup lang="ts">
import {onBeforeMount, ref} from "vue";

import {ListHeadType, ListItemType} from "@/types/list.ts";
import {ArtistsListType} from "@/types/artist.ts";

import {apiGetAllArtists} from "@api/veMusic/artist.ts";

import {useSignal} from "@composables/useSignal.ts";
import {showError} from "@utils/modals.ts";

import List from "@common/List.vue";
import Pagination from "@common/Pagination.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();

const signal = useSignal()

const headItems: ListHeadType[] = [
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

const artists = ref<ListItemType[]>([])

const page = ref(1)
const total = ref(0)

const isLoading = ref(true)

const setToStore = (artist: any) => {
  veMusicStore.currentArtist = artist
}

const getArtists = async () => {
  isLoading.value = true

  try {
    const response: ArtistsListType = await apiGetAllArtists(page.value, 30, signal)

    if (response) {
      page.value = response.page
      total.value = response.total
      artists.value = response.artists.map(artist => ({
        url: `/ve_music/artists/${artist.id}`,
        info: {
          ...artist
        }
      }))
    }
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
  getArtists()
  veMusicStore.createBtnInfo = {
    label: 'Добавить исполнителя',
    to: '/ve_music/artists/create',
  }
})
</script>

<template>

  <List :items="artists"
        :head-items="headItems"
        cols-style="4rem 9rem 9rem 10rem 1fr"
        :store-func="setToStore"
        :is-loading="isLoading"
  />

  <Pagination v-model="page" :total="total"/>

</template>