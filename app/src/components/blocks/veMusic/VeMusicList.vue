<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import {useRouter} from "vue-router";

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

const musicList = defineModel<MusicForListType[]>('musicList', {default: () => []})

const signal = useSignal()
const router = useRouter()

const isLoading = ref<boolean>(true)

const page = ref<number>(1)
const total = ref<number>(0)

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

const getArtists = (music: MusicForListType) => {
  return music?.artists?.flatMap(artist => artist.name)?.join(', ')
}

const handleMusic = (id: number) => {
  router.push(`/ve_music/music/${id}`)
}

onBeforeMount(() => getMusic())
</script>

<template>

  <div class="recolor-svg h-full flex flex-col overflow-y-auto overflow-x-hidden scrollbar-thin gap-5 relative">
    <Icon v-if="isLoading"
          :name="LoadingIcon"
          :size="30"
          class="absolute -translate-1/2 top-1/2 left-1/2"
    />

    <template v-else-if="musicList?.length">
      <ul class="flex flex-col gap-2.5 pr-2">
        <li v-for="music in musicList"
            :key="music.id"
            class="flex justify-between items-center gap-5 border rounded-xl p-2 cursor-pointer transition-colors hover:text-accent"
            @click="handleMusic(music.id)"
        >
          <div class="flex items-center gap-1 truncate">
            <span>{{getArtists(music)}}</span>
            <span>-</span>
            <span>{{music?.name}}</span>
          </div>

          <button class="recolor-svg text-white w-10 aspect-square rounded-full border shrink-0 flex items-center justify-center cursor-pointer transition-colors hover:text-accent"
                  type="button"
                  @click.stop="handleDelete(music.id)"
                  aria-label="Удалить"
                  title="Удалить"
          >
            <Icon :name="DeleteIcon" :size="20"/>
          </button>
        </li>
      </ul>

      <Pagination v-model="page"
                  :total="total"
                  :is-loading="isLoading"
      />
    </template>

    <p v-else class="text-center m-auto">Музыки нет..</p>
  </div>

</template>