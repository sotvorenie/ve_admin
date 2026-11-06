<script setup lang="ts">
import {ref} from "vue";

import {TrackFiles} from "@/types/music.ts";

import {VeMusicUploadService} from "@api/veMusic/VeMusicUploadService.ts";
import {VeMusicMusicService} from "@api/veMusic/VeMusicMusicService.ts";

import {showConfirm, showError} from "@utils/modals.ts";

import VeMusicPosters from "@components/veMusic/VeMusicPosters.vue";

import AudioUpload from "@ui/AudioUpload.vue";
import ImgUpload from "@ui/ImgUpload.vue";
import VideoUpload from "@ui/VideoUpload.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();

const props = defineProps<{
  musicId: number
  signal: AbortSignal
}>()

const isLoading = defineModel<boolean>('isLoading', {required: true})

const isVisiblePostersModal = ref<boolean>(false)

const files = ref<TrackFiles>({
  audio: null,
  preview: null,
  previewPath: '',
  video: null,
})

const showUploadError = async (err: any, label: string) => {
  await showError(
      'Ошибка загрузки данных для трека',
      `Не удалось загрузить ${label}.. Ошибка ${err?.detail}`
  )
}

const showDeleteError = async (err: any, label: string) => {
  await showError(
      'Ошибка удаления данных трека',
      `Не удалось удалить ${label}.. Ошибка ${err?.detail}`
  )
}

const uploadAudio = async (file: File) => {
  try {
    isLoading.value = true

    const response = await VeMusicUploadService.uploadAudio(props.musicId, file, props.signal)
    if (response) {
      files.value.audio = file
      veMusicStore.currentMusic!.url = response.url
    }
  } catch (err: any) {
    await showUploadError(err, 'аудио')
  } finally {
    isLoading.value = false
  }
}

const uploadPreview = async (file: File) => {
  try {
    isLoading.value = true

    const response = await VeMusicUploadService.uploadPreview(props.musicId, file, props.signal)
    if (response) {
      files.value.preview = file
      veMusicStore.currentMusic!.previewUrl = response.url
    }
  } catch (err: any) {
    await showUploadError(err, 'обложку')
  } finally {
    isLoading.value = false
  }
}

const handleUpdatePreviewUrl = async (url: string) => {
  const confirm = await showConfirm(
      'Редактирование постера музыки',
      'Вы действитиельно хотите загрузить новый постер для трека?'
  )

  if (confirm) {
    files.value.preview = null
    await updatePreviewUrl(url)
  }

  isVisiblePostersModal.value = false
}

const updatePreviewUrl = async (path: string) => {
  try {
    isLoading.value = true

    await VeMusicMusicService.updatePreviewUrl(props.musicId, path, props.signal)
    veMusicStore.currentMusic!.previewUrl = path
  } catch (err: any) {
    await showUploadError(err, 'обложку')
  } finally {
    isLoading.value = false
  }
}

const handleDeletePreview = async () => {
  const confirm = await showConfirm(
      'Удаление постера трека',
      'Вы действительно хотите удалить постер трека?'
  )

  if (confirm) await deletePreview()
}

const deletePreview = async () => {
  try {
    isLoading.value = true

    await VeMusicMusicService.deletePreview(props.musicId, props.signal)
    files.value.preview = null
    veMusicStore.currentMusic!.previewUrl = ''
  } catch (err) {
    await showDeleteError(err, 'аудио')
  } finally {
    isLoading.value = false
  }
}

const uploadVideo = async (file: File) => {
  try {
    isLoading.value = true

    const response = await VeMusicUploadService.uploadVideo(props.musicId, file, props.signal)
    if (response) {
      files.value.video = file
      veMusicStore.currentMusic!.videoClipUrl = response.url
    }
  } catch (err: any) {
    await showUploadError(err, 'видео')
  } finally {
    isLoading.value = false
  }
}

const deleteVideo = async () => {
  try {
    isLoading.value = true

    await VeMusicMusicService.deleteVideo(props.musicId, props.signal)
    files.value.video = null
    veMusicStore.currentMusic!.videoClipUrl = ''
  } catch (err) {
    await showDeleteError(err, 'видео')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>

  <div class="grid grid-cols-3 gap-2.5">
    <AudioUpload
        :audio-url="veMusicStore.currentMusic?.previewUrl"
        :disabled="isLoading"
        :can-delete="false"
        @select="(file: File) => uploadAudio(file)"
    />

    <div class="flex flex-col gap-2">
      <ImgUpload
          :img-url="veMusicStore.currentMusic?.previewUrl"
          :disabled="isLoading"
          @select="(file: File) => uploadPreview(file)"
          @delete="handleDeletePreview"
          class="aspect-square min-h-0"
      />

      <VeMusicPosters v-model:form="files"
                      v-model:is-visible="isVisiblePostersModal"
                      :disabled="isLoading"
                      @update-poster="handleUpdatePreviewUrl($event)"
                      class="shrink-0"
      />
    </div>

    <VideoUpload
        :video-url="veMusicStore.currentMusic?.videoClipUrl"
        :disabled="isLoading"
        @select="(file: File) => uploadVideo(file)"
        @delete="deleteVideo"
    />
  </div>

</template>