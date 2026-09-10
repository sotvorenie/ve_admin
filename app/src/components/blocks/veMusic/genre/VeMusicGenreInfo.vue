<script setup lang="ts">
import {ref, watchEffect} from "vue";

import {apiRedactGenreName} from "@api/veMusic/genre.ts";

import {showConfirm, showError} from "@utils/modals.ts";

import EditIcon from "@icons/EditIcon.vue";
import InputUi from "@ui/InputUi.vue";
import LabelUi from "@ui/LabelUi.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();

const props = defineProps<{
  genreId: number
  signal: AbortSignal
}>()

const isLoading = defineModel<boolean>('isLoading', {required: true})

const name = ref<string>('')

const handleRedactGenre = async () => {
  const confirm = await showConfirm(
      'Редактирование жанра музыки',
      'Вы действительно хотите редактировать название жанра?'
  )
  if (confirm) await redactGenre()
}

const redactGenre = async () => {
  try {
    isLoading.value = true

    await apiRedactGenreName(props.genreId, name.value, props.signal)
    veMusicStore.currentGenre!.name = name.value
  } catch (err: any) {
    await showError(
        'Ошибка редактирования жанра музыки',
        `Не удалось редактировать название жанра.. Ошибка: ${err.detail}`
    )
  } finally {
    isLoading.value = false
  }
}

watchEffect(() => {
  if (veMusicStore.currentGenre) name.value = veMusicStore.currentGenre.name
})
</script>

<template>

  <form novalidate class="genre__form flex flex-column gap-10 w-50 w-100">
    <LabelUi text="Название жанра:">
      <InputUi v-model="name"
               :disabled="isLoading"
               :action-btn="{
                      icon: EditIcon,
                      func: () => handleRedactGenre(),
                      visible: name?.length > 0 && name !== veMusicStore.currentGenre?.name
                   }"
      />
    </LabelUi>
  </form>

</template>