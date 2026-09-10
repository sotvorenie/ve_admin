<script setup lang="ts">
import {ref} from "vue";

import {apiUploadMusicAudio, apiUploadMusicPreview, apiUploadMusicVideo} from "@api/veMusic/upload.ts";
import {apiDeleteMusicPreview, apiDeleteMusicVideo} from "@api/veMusic/music.ts";

import {showError} from "@utils/modals.ts";

import {MusicFilesType} from "@/types/music.ts";
import {UrlType} from "@/types/url.ts";

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

const files = ref<MusicFilesType>({
  audio: null,
  preview: null,
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

    const response: UrlType = await apiUploadMusicAudio(props.musicId, file, props.signal)
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

    const response: UrlType = await apiUploadMusicPreview(props.musicId, file, props.signal)
    if (response) {
      files.value.audio = file
      veMusicStore.currentMusic!.previewUrl = response.url
    }
  } catch (err: any) {
    await showUploadError(err, 'обложку')
  } finally {
    isLoading.value = false
  }
}

const deletePreview = async () => {
  try {
    isLoading.value = true

    await apiDeleteMusicPreview(props.musicId, props.signal)
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

    const response: UrlType = await apiUploadMusicVideo(props.musicId, file, props.signal)
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

    await apiDeleteMusicVideo(props.musicId, props.signal)
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

  <div class="grid-cols-3 gap-10">
    <AudioUpload
        :audio-url="veMusicStore.currentMusic?.previewUrl"
        :disabled="isLoading"
        :can-delete="false"
        @select="(file: File) => uploadAudio(file)"
        class="aspect-1 min-w-0"
    />

    <ImgUpload
        :img-url="veMusicStore.currentMusic?.previewUrl"
        :disabled="isLoading"
        @select="(file: File) => uploadPreview(file)"
        @delete="deletePreview"
        class="aspect-1 min-w-0"
    />

    <VideoUpload
        :video-url="veMusicStore.currentMusic?.videoClipUrl"
        :disabled="isLoading"
        @select="(file: File) => uploadVideo(file)"
        @delete="deleteVideo"
        class="aspect-1 min-w-0"
    />
  </div>

</template>