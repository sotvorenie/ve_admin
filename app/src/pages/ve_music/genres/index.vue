<script setup lang="ts">
import {onBeforeMount, ref} from "vue";

import {GenresListType} from "@/types/genre.ts";
import {ListHeadType, ListItemType} from "@/types/list.ts";

import {apiGetAllGenres} from "@api/veMusic/genre.ts";

import {useSignal} from "@composables/useSignal.ts";
import {showError} from "@utils/modals.ts";

import List from "@common/List.vue";

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
    label: 'Название',
    key: 'name',
    type: 'text',
  },
]

const genres = ref<ListItemType[]>([])

const isLoading = ref(true)

const setToStore = (genre: any) => {
  veMusicStore.currentGenre = genre
}

const getGenres = async () => {
  isLoading.value = true

  try {
    const response: GenresListType = await apiGetAllGenres(signal)

    if (response) {
      genres.value = response.genres.map(genre => ({
        url: `/ve_music/genres/${genre.id}`,
        info: {
          ...genre
        }
      }))
    }
  } catch (err: any) {
    await showError(
        'Ошибка загрузки данных',
        `Не удалось загрузить список жанров... Ошибка: ${err.message}`
    )
  } finally {
    isLoading.value = false
  }
}

onBeforeMount(() => {
  getGenres()
  veMusicStore.createBtnInfo = {
    label: 'Добавить жанр',
    to: '/ve_music/genres/create',
  }
})
</script>

<template>

  <List :items="genres"
        :head-items="headItems"
        cols-style="4rem 9rem 9rem 1fr"
        :store-func="setToStore"
        :is-loading="isLoading"
  />

</template>