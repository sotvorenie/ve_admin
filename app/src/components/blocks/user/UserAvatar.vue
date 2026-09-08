<script setup lang="ts">
import {UrlType} from "@/types/url.ts";

import {apiDeleteAvatar, apiUploadAvatar} from "@api/user/user.ts";

import {showConfirm, showError} from "@utils/modals.ts";

import ImgUpload from "@ui/ImgUpload.vue";

import useUserStore from "@store/useUserStore.ts";
const userStore = useUserStore();

const props = defineProps<{
  confirmTitle: string
  errorTitle: string
  signal: AbortSignal
}>()

const isLoading = defineModel<boolean>('is-loading')

const updateAvatar = async (avatarFile: File) => {
  try {
    isLoading.value = true

    const response: UrlType = await apiUploadAvatar(avatarFile, props.signal)
    if (response) userStore.user.avatarUrl = response.url
  } catch {
    await showError(
        props.errorTitle,
        'Не удалось загрузить аватар пользователя'
    )
  } finally {
    isLoading.value = false
  }
}

const handleDeleteAvatar = async () => {
  const confirm = await showConfirm(
      props.confirmTitle,
      'Вы действительно хотите удалить аватарку?'
  )
  if (confirm) await deleteAvatar()
}

const deleteAvatar = async () => {
  try {
    isLoading.value = true

    await apiDeleteAvatar(props.signal)
    userStore.user.avatarUrl = ''
  } catch {
    await showError(
        props.errorTitle,
        'Не удалось удалить аватарку'
    )
  } finally {
    isLoading.value = false
  }
}
</script>

<template>

  <ImgUpload :img-url="userStore.user?.avatarUrl ? `${userStore.user.avatarUrl}?t=${Date.now()}` : null"
             :disabled="isLoading"
             @select="updateAvatar($event)"
             @delete="handleDeleteAvatar"
             class="user__avatar"
  />

</template>