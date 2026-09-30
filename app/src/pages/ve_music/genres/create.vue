<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";

import {CreatedGenreType} from "@/types/genre.ts";

import {apiCreateGenre} from "@api/veMusic/genre.ts";

import {useSignal} from "@composables/useSignal.ts";
import {showConfirm, showError} from "@utils/modals.ts";

import InputUi from "@ui/InputUi.vue";
import LabelUi from "@ui/LabelUi.vue";
import ButtonUi from "@ui/ButtonUi.vue";

import CrossIcon from "@icons/CrossIcon.vue";

const router = useRouter()
const signal = useSignal()

const name = ref<string>('')

const isLoading = ref(false)

const handleCreateGenre = async () => {
  const confirm = await showConfirm(
      'Создание жанра музыки',
      'Вы действительно хотите создать новый жанр?'
  )

  if (confirm) await createGenre()
}

const createGenre = async () => {
  try {
    isLoading.value = true

    const response: CreatedGenreType = await apiCreateGenre(name.value, signal)
    if (response) await router.replace('/ve_music/genres')
  } catch (err: any) {
    await showError('Ошибка создания жанра', err.detail)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>

  <div class="h-full flex items-center justify-center">
    <div class="w-1/2 2xl:w-1/3 flex flex-col gap-5">
      <form novalidate class="flex flex-col gap-2.5 w-full">
        <LabelUi text="Название жанра:">
          <InputUi v-model="name"
                   :disabled="isLoading"
                   maxlength="50"
                   :action-btn="{
                      icon: CrossIcon,
                      func: () => name = '',
                      visible: !!name?.length
                   }"
          />
        </LabelUi>
      </form>

      <div class="grid grid-cols-2 gap-2.5">
        <ButtonUi :disabled="isLoading"
                  @click="router.replace('/ve_music/genres')"
        >
          Отмена
        </ButtonUi>

        <ButtonUi :disabled="isLoading"
                  @click="handleCreateGenre"
        >
          Добавить
        </ButtonUi>
      </div>
    </div>
  </div>

</template>