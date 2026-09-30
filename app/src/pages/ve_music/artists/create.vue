<script setup lang="ts">
import {computed, ref} from "vue";
import {useRouter} from "vue-router";

import {CreatedArtistType} from "@/types/artist.ts";

import {apiCreateArtist} from "@api/veMusic/artist.ts";

import {useSignal} from "@composables/useSignal.ts";
import {showConfirm, showError} from "@utils/modals.ts";

import VeMusicCreateArtistInfo from "@components/veMusic/createArtist/VeMusicCreateArtistInfo.vue";

import ButtonUi from "@ui/ButtonUi.vue";
import ImgUpload from "@ui/ImgUpload.vue";

const router = useRouter()
const signal = useSignal()

const name = ref<string>('')
const avatarFile = ref<File | null>(null)

const isLoading = ref(false)

const isCreateBtnVisible = computed(() => {
  return name.value.length > 0 && avatarFile.value
})

const handleCreateArtist = async () => {
  const confirm = await showConfirm(
      'Создание исполнителя',
      'Вы действительно хотите создать нового исполнителя?'
  )

  if (confirm) await createArtist()
}

const createArtist = async () => {
  if (!name.value.length || !avatarFile.value) return

  try {
    isLoading.value = true

    const response: CreatedArtistType = await apiCreateArtist(name.value, avatarFile.value, signal)
    if (response) await router.replace('/ve_music/artists')
  } catch (err: any) {
    await showError('Ошибка создания исполнителя', err.detail)
  } finally {
    isLoading.value = false
  }
}

const URL = window.URL
</script>

<template>

  <div class="h-full flex items-center justify-center">
    <div class="w-1/4 flex flex-col gap-5">
      <ImgUpload :img-url="avatarFile ? URL.createObjectURL(avatarFile) : ''"
                 :disabled="isLoading"
                 :show-confirm="false"
                 @select="(file: File) => avatarFile = file"
                 @delete="avatarFile = null"
                 class="aspect-square min-w-0"
      />

      <VeMusicCreateArtistInfo v-model:name="name"
                               :is-loading="isLoading"
      />

      <div class="grid grid-cols-2 gap-2.5">
        <ButtonUi :disabled="isLoading"
                  @click="router.replace('/ve_music/artists')"
        >
          Отмена
        </ButtonUi>

        <ButtonUi :disabled="isLoading || !isCreateBtnVisible"
                  @click="handleCreateArtist"
        >
          Добавить
        </ButtonUi>
      </div>
    </div>
  </div>

</template>