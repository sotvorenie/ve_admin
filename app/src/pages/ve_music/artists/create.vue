<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";

import {CreatedArtistType} from "@/types/artist.ts";

import {apiCreateArtist} from "@api/veMusic/artist.ts";

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

const handleCreateArtist = async () => {
  const confirm = await showConfirm(
      'Создание исполнителя',
      'Вы действительно хотите создать нового исполнителя?'
  )

  if (confirm) await createArtist()
}

const createArtist = async () => {
  try {
    isLoading.value = true

    const response: CreatedArtistType = await apiCreateArtist(name.value, signal)
    if (response) await router.replace('/ve_music/artists')
  } catch (err: any) {
    await showError('Ошибка создания исполнителя', err.detail)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>

  <div class="h-100 flex-center">
    <div class="w-50 flex flex-column gap-20">
      <form novalidate class="flex flex-column gap-10 w-50 w-100">
        <LabelUi text="Исполнитель:">
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
                  @click="router.replace('/ve_music/artists')"
        >
          Отмена
        </ButtonUi>

        <ButtonUi :disabled="isLoading"
                  @click="handleCreateArtist"
        >
          Добавить
        </ButtonUi>
      </div>
    </div>
  </div>

</template>