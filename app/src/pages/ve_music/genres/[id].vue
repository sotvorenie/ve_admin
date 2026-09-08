<script setup lang="ts">
import {computed, onBeforeMount, ref, watchEffect} from "vue";
import {useRoute, useRouter} from "vue-router";

import {GenreType} from "@/types/genre.ts";

import {apiDeleteGenre, apiGetGenre, apiRedactGenreName} from "@api/veMusic/genre.ts";

import {useSignal} from "@composables/useSignal.ts";
import {showConfirm, showError} from "@utils/modals.ts";

import InputUi from "@ui/InputUi.vue";
import LabelUi from "@ui/LabelUi.vue";
import ButtonUi from "@ui/ButtonUi.vue";

import EditIcon from "@icons/EditIcon.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();
import usePageStore from "@store/usePageStore.ts";
const pageStore = usePageStore();

const router = useRouter()
const route = useRoute()
const signal = useSignal()

const genreId = computed(() => route.params.id)

const name = ref<string>('')

const isLoading = ref(false)

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

    await apiRedactGenreName(+genreId.value, name.value, signal)
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

    await apiDeleteGenre(+genreId.value, signal)
    await router.replace('/ve_music/genres')
  } catch (err: any) {
    await showError('Ошибка создания жанра', err.detail)
  } finally {
    isLoading.value = false
  }
}

const getCurrentGenre = async () => {
  isLoading.value = true

  try {
    const response: GenreType = await apiGetGenre(+genreId.value, signal)

    if (response) veMusicStore.currentGenre = response
  } catch (err: any) {
    await showError(
        'Ошибка получения данных',
        `Не удалось загрузить данные жанра.. Ошибка: ${err.detail}`
    )
  } finally {
    isLoading.value = false
  }
}

onBeforeMount(() => getCurrentGenre())

watchEffect(() => {
  pageStore.pageTitle =
      `Жанр veMusic: (${veMusicStore.currentGenre?.id}) "${veMusicStore.currentGenre?.name}"`

  if (veMusicStore.currentGenre) {
    name.value = veMusicStore.currentGenre.name
  }
})
</script>

<template>

  <div class="genre h-100 flex-center">
    <div class="w-50 flex flex-column gap-20">
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
    </div>
  </div>

</template>