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
    await showError('Ошибка создания жанра', err.message)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>

  <div class="genre h-100 flex-center">
    <div class="w-50 flex flex-column gap-20">
      <form novalidate class="genre__form flex flex-column gap-10 w-50 w-100">
        <LabelUi text="Название жанра:">
          <InputUi v-model="name"
                   :disabled="isLoading"
                   :action-btn="{
                      icon: CrossIcon,
                      func: () => name = '',
                      visible: !!name?.length
                   }"
          />
        </LabelUi>
      </form>

      <div class="flex gap-10 w-50 w-100">
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