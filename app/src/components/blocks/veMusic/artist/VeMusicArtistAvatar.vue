<script setup lang="ts">
import {VeMusicArtistService} from "@api/veMusic/VeMusicArtistService.ts";

import {showConfirm, showError} from "@utils/modals.ts";

import ImgUpload from "@ui/ImgUpload.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();

const props = defineProps<{
  artistId: number
  signal: AbortSignal
}>()

const isLoading = defineModel<boolean>('isLoading', {default: true})

const uploadAvatar = async (file: File) => {
  try {
    isLoading.value = true

    const response = await VeMusicArtistService.uploadAvatar(props.artistId, file, props.signal)
    if (response) veMusicStore.currentArtist!.avatarUrl = response.url
  } catch (err){
    await showError(
        'Ошибка загрузки аватарки',
        'Не удалось загрузить аватарку исполнителя'
    )
  } finally {
    isLoading.value = false
  }
}

const handleDeleteAvatar = async () => {
  const confirm = await showConfirm(
      'Удаление фото',
      'Вы действительно хотите удалить аватарку исполнителя?'
  )

  if (confirm) await deleteAvatar()
}

const deleteAvatar = async () => {
  try {
    isLoading.value = true

    await VeMusicArtistService.deleteAvatar(props.artistId, props.signal)
    veMusicStore.currentArtist!.avatarUrl = ''
  } catch (err: any) {
    await showError(
        'Ошибка удаления аватарки',
        err?.detail
    )
  } finally {
    isLoading.value = false
  }
}
</script>

<template>

  <div class="aspect-square">
    <ImgUpload :img-url="veMusicStore.currentArtist?.avatarUrl"
               :disabled="isLoading"
               @select="(file: File) => uploadAvatar(file)"
               @delete="handleDeleteAvatar"
    />
  </div>

</template>