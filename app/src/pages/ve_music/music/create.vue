<script setup lang="ts">
import {computed, ref} from "vue";
import {useRouter} from "vue-router";

import {MusicFilesType, MusicInfoType} from "@/types/music.ts";

import {apiUploadMusic} from "@api/veMusic/upload.ts";

import {useSignal} from "@composables/useSignal.ts";
import {showConfirm, showError} from "@utils/modals.ts";

import VeMusicCreateMusicFiles from "@components/veMusic/createMusic/VeMusicCreateMusicFiles.vue";
import VeMusicCreateMusicInfo from "@components/veMusic/createMusic/VeMusicCreateMusicInfo.vue";

import ButtonUi from "@ui/ButtonUi.vue";

export interface CreateMusicForm {
  files: MusicFilesType
  info: MusicInfoType
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
  const confirm = await showConfirm(
      'Создание музыки',
      'Вы действительно хотите создать новую музыку?'
  )
  if (confirm) await createMusic()
}

const createMusic = async () => {
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
  return !f.files.audio || !f.info.title || f.info.genre < 0 || f.info.artistsIds.length === 0
})
</script>

<template>

  <div class="h-full flex items-center justify-center">
    <div class="w-1/2 flex flex-col gap-5">
      <VeMusicCreateMusicFiles v-model:form="form.files"
                               :is-loading="isLoading"
      />

      <VeMusicCreateMusicInfo v-model:form="form.info"
                              :is-loading="isLoading"
      />

      <div class="grid grid-cols-2 gap-2.5">
        <ButtonUi :disabled="isLoading"
                  @click="router.replace('/ve_music/music')"
        >
          Отмена
        </ButtonUi>

        <ButtonUi :disabled="isLoading || isSaveBtnDisabled"
                  @click="handleCreateMusic"
                  class="not-disabled:cursor-pointer disabled:pointer-events-none transition-colors"
        >
          Добавить
        </ButtonUi>
      </div>
    </div>
  </div>

</template>