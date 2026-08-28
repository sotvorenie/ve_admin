<script setup lang="ts">
import {showConfirm} from "@utils/modals.ts";

import ImgUpload from "@ui/ImgUpload.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();

defineProps<{
  isLoading: boolean
}>()

const handleRedactAvatar = (file: File) => {
  console.log(file.name)
}

const handleDeleteAvatar = async () => {
  const confirm = await showConfirm(
      'Удаление фото',
      'Вы действительно хотите удалить аватарку пользователя?'
  )

  if (confirm) {

  }
}

</script>

<template>

  <div class="user__avatar">
    <ImgUpload :img-url="veMusicStore.currentUser?.avatarUrl"
               :disabled="isLoading"
               @select="(file: File) => handleRedactAvatar(file)"
               @delete="handleDeleteAvatar"
    />
  </div>

</template>