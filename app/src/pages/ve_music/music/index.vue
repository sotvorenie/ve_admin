<script setup lang="ts">
import {onBeforeMount, ref} from "vue";

import {ListHeadType, ListItemType} from "@/types/list.ts";
import {MusicListType} from "@/types/music.ts";

import {apiGetAllMusic} from "@api/veMusic/music.ts";

import {useSignal} from "@composables/useSignal.ts";
import {formatDuration} from "@composables/useFormstDuration.ts";
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
    label: 'Название',
    key: 'name',
    type: 'text',
  },
  {
    label: 'Обложка',
    key: 'previewUrl',
    type: 'preview',
  },
  {
    label: 'Длительность',
    key: 'duration',
    type: 'text',
    formatFunction: formatDuration
  },
  {
    label: 'Исполнитель',
    key: 'artistName',
    type: 'text',
    to: {
      page: '/artists/',
      id: 'artistId'
    }
  },
]

const music = ref<ListItemType[]>([])

const page = ref(1)
const total = ref(0)

const isLoading = ref(true)

const setToStore = (music: any) => {
  veMusicStore.currentMusic = music
}

const getUsers = async () => {
  isLoading.value = true

  try {
    const response: MusicListType = await apiGetAllMusic('', -1, -1, page.value, 30, signal)

    if (response) {
      page.value = response.page
      total.value = response.total
      music.value = response.music.map(m => ({
        url: `/ve_music/music/${m.id}`,
        info: {
          ...m
        }
      }))
    }
  } catch (err: any) {
    await showError(
        'Ошибка загрузки данных',
        `Не удалось загрузить список музыки... Ошибка: ${err.message}`
    )
  } finally {
    isLoading.value = false
  }
}

onBeforeMount(() => {
  getUsers()
  veMusicStore.createBtnInfo = {
    label: 'Добавить музыку',
    to: '/ve_music/music/create',
  }
})
</script>

<template>

  <List :items="music"
        :head-items="headItems"
        cols-style="4rem 9rem 9rem 1fr 10rem 6rem 1fr"
        :store-func="setToStore"
        :is-loading="isLoading"
  />

  <Pagination v-model="page" :total="total"/>

</template>