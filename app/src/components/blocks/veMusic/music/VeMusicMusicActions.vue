<script setup lang="ts">
import {useRouter} from "vue-router";

import {VeMusicMusicService} from "@api/veMusic/VeMusicMusicService.ts";

import {showConfirm, showError} from "@utils/modals.ts";

import ButtonUi from "@ui/ButtonUi.vue";

const router = useRouter()

const props = defineProps<{
  musicId: number
  signal: AbortSignal
}>()

const isLoading = defineModel<boolean>('isLoading', {required: true})

const handleDelete = async () => {
  const confirm = await showConfirm(
      'Удаление музыки',
      'Вы действительно хотите удалить музыку?'
  )
  if (confirm) await deleteMusic()
}

const deleteMusic = async () => {
  try {
    isLoading.value = true

    await VeMusicMusicService.delete(props.musicId, props.signal)
    await router.replace('/ve_music/music')
  } catch (err: any) {
    await showError(
        'Ошибка удаления музыки',
        `Не удалось удалить музыку.. Ошибка: ${err?.detail}`
    )
  } finally {
    isLoading.value = false
  }
}
</script>

<template>

  <div class="grid grid-cols-2 gap-2.5">
    <ButtonUi :disabled="isLoading"
              @click="router.back()"
    >
      Отмена
    </ButtonUi>

    <ButtonUi :disabled="isLoading"
              @click="handleDelete"
    >
      Удалить
    </ButtonUi>
  </div>

</template>