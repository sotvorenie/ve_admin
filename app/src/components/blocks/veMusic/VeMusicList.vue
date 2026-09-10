<script setup lang="ts">
import {onBeforeMount, ref} from "vue";

import {MusicForListType, MusicListType} from "@/types/music.ts";

import {useSignal} from "@composables/useSignal.ts";
import {showConfirm, showError} from "@utils/modals.ts";

import Pagination from "@common/Pagination.vue";

import Icon from "@ui/Icon.vue";

import DeleteIcon from "@icons/DeleteIcon.vue";
import LoadingIcon from "@icons/LoadingIcon.vue";

const props = defineProps<{
  getFunc: Function
  deleteFunc: Function
  userId: number
}>()

const signal = useSignal()

const isLoading = ref<boolean>(true)

const page = ref<number>(1)
const total = ref<number>(0)

const musicList = ref<MusicForListType[]>([])

const getMusic = async () => {
  try {
    isLoading.value = true

    const response: MusicListType = await props.getFunc(props.userId, page.value, 30, signal)
    if (response) {
      total.value = response.total
      page.value = response.page
      musicList.value = response.music
    }
  } catch (err: any) {
    await showError(
        'Ошибка получения музыки',
        `Не удалось загрузить список музыки.. Ошибка: ${err?.detail}`
    )
  } finally {
    isLoading.value = false
  }
}

const handleDelete = async (id: number) => {
  const confirm = await showConfirm(
      'Удаление музыки',
      'Вы действительно хотите удалить музыку?'
  )
  if (confirm) await deleteMusic(id)
}

const deleteMusic = async (id: number) => {
  try {
    isLoading.value = true

    await props.deleteFunc(id, props.userId, signal)
    musicList.value = musicList.value.filter(m => m.id !== id)
  } catch (err: any) {
    await showError(
        'Ошибка удаления музыки',
        `Не удалось удалить музыку.. Ошибка: ${err?.detail}`
    )
  } finally {
    isLoading.value = false
  }
}

onBeforeMount(() => getMusic())
</script>

<template>

  <div class="flex-center flex-column gap-20">
    <Icon v-if="isLoading" :name="LoadingIcon" :size="30"/>

    <template v-else-if="musicList?.length">
      <ul class="flex flex-column gap-10">
        <li v-for="music in musicList"
            :key="music.id"
            class="flex justify-between align-center gap-20"
        >
          <div class="flex align-center gap-20">
            <span>{{music?.artists?.join(', ')}}</span>
            <span>-</span>
            <span>{{music?.name}}</span>
          </div>

          <button class="square-40 rounded-full border border-light-alt flex-center"
                  type="button"
                  @click="handleDelete(music.id)"
          >
            <Icon :name="DeleteIcon" :size="30"/>
          </button>
        </li>
      </ul>

      <Pagination v-model="page"
                  :total="total"
                  :is-loading="isLoading"
      />
    </template>

    <p v-else class="text-center">Музыки нет..</p>
  </div>

</template>