<script setup lang="ts">
import {computed, ref} from "vue";
import {useRouter} from "vue-router";

import VeMusicCreateMusicFiles from "@components/veMusic/createMusic/VeMusicCreateMusicFiles.vue";
import VeMusicCreateMusicInfo from "@components/veMusic/createMusic/VeMusicCreateMusicInfo.vue";

import ButtonUi from "@ui/ButtonUi.vue";
import {showError} from "@utils/modals.ts";
import {apiUploadMusic} from "@api/veMusic/upload.ts";
import {useSignal} from "@composables/useSignal.ts";

export interface CreateMusicFiles {
  audio: File | null
  preview: File | null
  video: File | null
}
export interface CreateMusicInfo {
  title: string
  genre: number
  artistsIds: number[]
}
export interface CreateMusicForm {
  files: CreateMusicFiles
  info: CreateMusicInfo
}

const router = useRouter()
const signal = useSignal()

const form = ref<CreateMusicForm>({
  files: {
    audio: null,
    preview: null,
    video: null
  },
  info: {
    title: '',
    genre: -1,
    artistsIds: []
  }
})

const isLoading = ref<boolean>(false)

const handleCreateMusic = async () => {
  try {
    isLoading.value = true

    await apiUploadMusic(form.value, signal)
    await router.replace('/ve_music/music')
  } catch (err: any) {
    await showError(
        'Ошибка загрузки музыки',
        `Не удалось загрузить музыку.. Ошибка: ${err?.detail}`
    )
  } finally {
    isLoading.value = false
  }
}

const isSaveBtnDisabled = computed(() => {
  const f = form.value
  return !f.files.audio || !f.files.preview || !f.info.title || f.info.genre < 0 || f.info.artistsIds.length === 0
})
</script>

<template>

  <div class="h-100 flex-center">
    <div class="w-50 flex flex-column gap-20">
      <VeMusicCreateMusicFiles v-model:form="form.files"
                               :is-loading="isLoading"
      />

      <VeMusicCreateMusicInfo v-model:form="form.info"
                              :is-loading="isLoading"
      />

      <div class="flex gap-10 w-100">
        <ButtonUi :disabled="isLoading"
                  @click="router.replace('/ve_music/genres')"
        >
          Отмена
        </ButtonUi>

        <ButtonUi :disabled="isLoading || isSaveBtnDisabled"
                  @click="handleCreateMusic"
        >
          Добавить
        </ButtonUi>
      </div>
    </div>
  </div>

</template>