<script setup lang="ts">
import {UrlType} from "@/types/url.ts";

import {apiDeleteUserAvatar, apiUploadUserAvatar} from "@api/veMusic/user.ts";

import {showConfirm, showError} from "@utils/modals.ts";

import ImgUpload from "@ui/ImgUpload.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();

const props = defineProps<{
  userId: number
  signal: AbortSignal
}>()

const isLoading = defineModel<boolean>('isLoading', {default: true})

const uploadAvatar = async (file: File) => {
  try {
    isLoading.value = true

    const response: UrlType = await apiUploadUserAvatar(props.userId, file, props.signal)
    if (response) veMusicStore.currentUser!.avatarUrl = response.url
  } catch (err: any) {
    await showError(
        'Ошибка загрузки аватарки',
        `Не удалось загрузить аватарку пользователя.. Ошибка: ${err?.detail}`
    )
  } finally {
    isLoading.value = false
  }
}

const handleDeleteAvatar = async () => {
  const confirm = await showConfirm(
      'Удаление аватарки',
      'Вы действительно хотите удалить аватарку пользователя?'
  )

  if (confirm) await deleteAvatar()
}

const deleteAvatar = async () => {
  try {
    isLoading.value = true

    await apiDeleteUserAvatar(props.userId, props.signal)
    veMusicStore.currentUser!.avatarUrl = ''
  } catch (err: any) {
    await showError(
        'Ошибка удаления аватарки',
        `Не удалось удалить аватарку пользователя.. Ошибка: ${err?.detail}`
    )
  } finally {
    isLoading.value = false
  }
}
</script>

<template>

  <div class="aspect-1">
    <ImgUpload :img-url="veMusicStore.currentUser?.avatarUrl"
               :disabled="isLoading"
               @select="(file: File) => uploadAvatar(file)"
               @delete="handleDeleteAvatar"
    />
  </div>

</template>