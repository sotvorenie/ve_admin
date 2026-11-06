<script setup lang="ts">
import {UserService} from "@api/user/UserService.ts";

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

const uploadAvatar = async (avatarFile: File) => {
  try {
    isLoading.value = true

    const response = await UserService.uploadAvatar(avatarFile, props.signal)

    userStore.user.avatarUrl = response.url
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

    await UserService.deleteAvatar(props.signal)
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
             @select="uploadAvatar($event)"
             @delete="handleDeleteAvatar"
             class="aspect-square"
  />

</template>