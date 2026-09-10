<script setup lang="ts">
import {useRouter} from "vue-router";

import {apiDeleteGenre} from "@api/veMusic/genre.ts";

import {showConfirm, showError} from "@utils/modals.ts";

import ButtonUi from "@ui/ButtonUi.vue";

const router = useRouter()

const props = defineProps<{
  genreId: number
  signal: AbortSignal
}>()

const isLoading = defineModel<boolean>('isLoading', {required: true})

const handleDeleteGenre = async () => {
  const confirm = await showConfirm(
      'Удаление жанра музыки',
      'Вы действительно хотите удалить жанр?'
  )

  if (confirm) await deleteGenre()
}

const deleteGenre = async () => {
  try {
    isLoading.value = true

    await apiDeleteGenre(props.genreId, props.signal)
    await router.replace('/ve_music/genres')
  } catch (err: any) {
    await showError('Ошибка создания жанра', err.detail)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>

  <div class="flex gap-10 w-50 w-100">
    <ButtonUi :disabled="isLoading"
              @click="router.replace('/ve_music/genres')"
    >
      Назад
    </ButtonUi>

    <ButtonUi :disabled="isLoading"
              @click="handleDeleteGenre"
    >
      Удалить
    </ButtonUi>
  </div>

</template>