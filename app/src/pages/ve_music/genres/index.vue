<script setup lang="ts">
import {onBeforeMount, ref} from "vue";

import {ListHead, ListItem} from "@/types/list.ts";

import {VeMusicGenreService} from "@api/veMusic/VeMusicGenreService.ts";

import {useSignal} from "@composables/useSignal.ts";
import {showError} from "@utils/modals.ts";

import List from "@common/List.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();
import usePageStore from "@store/usePageStore.ts";
const pageStore = usePageStore();

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
    label: 'Название',
    key: 'name',
    type: 'text',
  },
]

const genres = ref<ListItem[]>([])

const isLoading = ref(true)

const setToStore = (genre: any) => {
  veMusicStore.currentGenre = genre
}

const getGenres = async () => {
  isLoading.value = true

  try {
    const response = await VeMusicGenreService.getAllGenres(signal)

    genres.value = response.data.map(genre => ({
      url: `/ve_music/genres/${genre.id}`,
      info: {
        ...genre
      }
    }))
  } catch (err: any) {
    await showError(
        'Ошибка загрузки данных',
        `Не удалось загрузить список жанров... Ошибка: ${err.detail}`
    )
  } finally {
    isLoading.value = false
  }
}

onBeforeMount(() => {
  pageStore.createBtnInfo = {
    label: 'Добавить жанр',
    to: '/ve_music/genres/create',
  }

  getGenres()
})
</script>

<template>

  <List :page="1"
        :total="genres?.length"
        :items="genres"
        :head-items="headItems"
        cols-style="4rem 9rem 9rem 1fr"
        :store-func="setToStore"
        :is-loading="isLoading"
  />

</template>