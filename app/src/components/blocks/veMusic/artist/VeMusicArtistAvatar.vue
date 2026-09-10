<script setup lang="ts">
import {UrlType} from "@/types/url.ts";

import {apiDeleteArtistAvatar, apiUploadArtistAvatar} from "@api/veMusic/artist.ts";

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

    const response: UrlType = await apiUploadArtistAvatar(props.artistId, file, props.signal)
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

    await apiDeleteArtistAvatar(props.artistId, props.signal)
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

  <div class="aspect-1">
    <ImgUpload :img-url="veMusicStore.currentArtist?.avatarUrl"
               :disabled="isLoading"
               @select="(file: File) => uploadAvatar(file)"
               @delete="handleDeleteAvatar"
    />
  </div>

</template>