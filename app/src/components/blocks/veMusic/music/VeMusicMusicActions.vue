<script setup lang="ts">
import {useRouter} from "vue-router";

import {showConfirm, showError} from "@utils/modals.ts";

import ButtonUi from "@ui/ButtonUi.vue";
import {apiDeleteMusic} from "@api/veMusic/music.ts";

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

    await apiDeleteMusic(props.musicId, props.signal)
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

  <div class="flex gap-20">
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