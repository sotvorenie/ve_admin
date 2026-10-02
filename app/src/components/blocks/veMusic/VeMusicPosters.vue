<script setup lang="ts">
import {onBeforeMount, ref} from "vue";

import {MusicFilesType} from "@/types/music.ts";

import {apiGetMusicPosters} from "@api/veMusic/music.ts";

import {showError} from "@utils/modals.ts";

import Modal from "@ui/Modal.vue";
import ButtonUi from "@ui/ButtonUi.vue";

import useApiUrlStore from "@store/useApiUrlStore.ts";
const apiUrlStore = useApiUrlStore();

const form = defineModel<MusicFilesType>('form', {required: true})

const emits = defineEmits<{
  updatePoster: [string]
}>()

const posters = ref<string[]>([])

const isLoading = ref<boolean>(true)

const getPosters = async () => {
  try {
    isLoading.value = true

    const response = await apiGetMusicPosters()
    if (response) posters.value = response.posters
  } catch (err: any) {
    await showError(
        'Ошибка загрузки постеров',
        `Не удалось загрузить постеры.. Ошибка: ${err?.detail}`
    )
  } finally {
    isLoading.value = false
  }
}

const handlePoster = (url: string) => {
  if (form.value.previewPath === url) {
    form.value.previewPath = ''
  } else {
    form.value.preview = null
    form.value.previewPath = url
    emits('updatePoster', form.value.previewPath)
  }
}

onBeforeMount(() => getPosters())
</script>

<template>

  <Modal :size="700">
    <template #activator="{open}">
      <ButtonUi @click="open">
        Выбрать постер
      </ButtonUi>
    </template>

    <template #default>
      <p class="text-lg font-medium mb-2">Список постеров</p>

      <ul class="grid grid-cols-4 gap-2">
        <li v-for="(poster, index) in posters"
            :key="poster"
            class="img-container aspect-square rounded-xl cursor-pointer group relative"
            @click="handlePoster(poster)"
        >
          <img :src="`${apiUrlStore.activeUrl}${poster}`"
               :alt="String(index)"
               class="group-hover:scale-105 transition-all duration-200"
          >

          <div class="absolute top-2 right-2 w-5 aspect-square rounded-full border border-white flex items-center justify-center shrink-0">
            <div class="w-1/2 aspect-square rounded-full transition-colors"
                 :class="form.previewPath === poster && 'bg-accent'"
            />
          </div>
        </li>
      </ul>
    </template>
  </Modal>

</template>