<script setup lang="ts">
import {computed, ref, watchEffect} from "vue";

import {UrlType} from "@/types/url.ts";

import {apiRedactAudioUrlForMusic, apiRedactPreviewUrlForMusic, apiRedactVideoUrlForMusic} from "@api/veMusic/music.ts";

import {showConfirm, showError} from "@utils/modals.ts";

import InputUi from "@ui/InputUi.vue";
import LabelUi from "@ui/LabelUi.vue";

import EditIcon from "@icons/EditIcon.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();

const props = defineProps<{
  musicId: number
  signal: AbortSignal
}>()

const isLoading = defineModel<boolean>('isLoading', {required: true})

interface Form {
  audioUrl: string
  previewUrl: string
  videoUrl: string
}

const formatPath = (url: string) => {
  if (!url) return ''
  const formattedUrl = url
      .replace('/static/', '')
      .replace(/\//g, '\\')
  return `${import.meta.env.VITE_VE_MUSIC_PATH}\\${formattedUrl}`
}

const form = ref<Form>({
  audioUrl: formatPath(veMusicStore.currentMusic?.url ?? ''),
  previewUrl: formatPath(veMusicStore.currentMusic?.previewUrl ?? ''),
  videoUrl: formatPath(veMusicStore.currentMusic?.videoClipUrl ?? ''),
})

const editAudioVisible = computed(() => {
  return form.value.audioUrl !== formatPath(veMusicStore.currentMusic?.url ?? '')
      && form.value.audioUrl?.length > 0
})

const editPreviewVisible = computed(() => {
  return form.value.previewUrl !== formatPath(veMusicStore.currentMusic?.previewUrl ?? '')
      && form.value.previewUrl?.length > 0
})

const editVideoVisible = computed(() => {
  return form.value.videoUrl !== formatPath(veMusicStore.currentMusic?.videoClipUrl ?? '')
      && form.value.videoUrl?.length > 0
})

const showDeleteError = async (err: any, label: string) => {
  await showError(
      'Ошибка редактирования url',
      `Не удалось редактировать url для ${label}.. Ошибка: ${err?.detail}`
  )
}

const handleRedactAudio = async () => {
  const confirm = await showConfirm(
      'Редактирование аудио',
      'Вы действительно хотите редактировать url аудио-файла?'
  )
  if (confirm) await redactAudio()
}

const redactAudio = async () => {
  try {
    isLoading.value = true

    const response: UrlType = await apiRedactAudioUrlForMusic(props.musicId, form.value.audioUrl, props.signal)
    if (response) veMusicStore.currentMusic!.url = response.url
  } catch (err: any) {
    await showDeleteError(err, 'аудио')
  } finally {
    isLoading.value = false
  }
}

const handleRedactPreview = async () => {
  const confirm = await showConfirm(
      'Редактирование обложки',
      'Вы действительно хотите редактировать url обложки?'
  )
  if (confirm) await redactPreview()
}

const redactPreview = async () => {
  try {
    isLoading.value = true

    const response: UrlType = await apiRedactPreviewUrlForMusic(props.musicId, form.value.previewUrl, props.signal)
    if (response) veMusicStore.currentMusic!.previewUrl = response.url
  } catch (err: any) {
    await showDeleteError(err, 'обложки')
  } finally {
    isLoading.value = false
  }
}

const handleRedactVideo = async () => {
  const confirm = await showConfirm(
      'Редактирование клипа',
      'Вы действительно хотите редактировать url видео-файла?'
  )
  if (confirm) await redactVideo()
}

const redactVideo = async () => {
  try {
    isLoading.value = true

    const response: UrlType = await apiRedactVideoUrlForMusic(props.musicId, form.value.videoUrl, props.signal)
    if (response) veMusicStore.currentMusic!.videoClipUrl = response.url
  } catch (err: any) {
    await showDeleteError(err, 'клипа')
  } finally {
    isLoading.value = false
  }
}

watchEffect(() => {
  if (veMusicStore.currentMusic) {
    form.value.audioUrl = formatPath(veMusicStore.currentMusic.url, 'music')
    form.value.previewUrl = formatPath(veMusicStore.currentMusic.previewUrl ?? '', 'previews')
    form.value.videoUrl = formatPath(veMusicStore.currentMusic.videoClipUrl ?? '', 'videos')
  }
})
</script>

<template>

  <form novalidate class="flex flex-column gap-20 w-100">
    <LabelUi text="Url аудио:">
      <InputUi v-model="form.audioUrl"
               :disabled="isLoading"
               :action-btn="{
                      icon: EditIcon,
                      func: () => handleRedactAudio(),
                      visible: editAudioVisible
                   }"
      />
    </LabelUi>

    <LabelUi text="Url обложки:">
      <InputUi v-model="form.previewUrl"
               :disabled="isLoading"
               :action-btn="{
                      icon: EditIcon,
                      func: () => handleRedactPreview(),
                      visible: editPreviewVisible
                   }"
      />
    </LabelUi>

    <LabelUi text="Url клипа:">
      <InputUi v-model="form.videoUrl"
               :disabled="isLoading"
               :action-btn="{
                      icon: EditIcon,
                      func: () => handleRedactVideo(),
                      visible: editVideoVisible
                   }"
      />
    </LabelUi>
  </form>

</template>