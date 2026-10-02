<script setup lang="ts">
import {computed, ref, watchEffect} from "vue";

import {UrlType} from "@/types/url.ts";

import {apiRedactPreviewUrlForMusic, apiRedactVideoUrlForMusic} from "@api/veMusic/music.ts";

import {formatPath} from "@composables/useFormatPath.ts";
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
  previewUrl: string
  videoUrl: string
}

const form = ref<Form>({
  previewUrl: '',
  videoUrl: '',
})

const editPreviewVisible = computed(() => {
  return form.value.previewUrl !== formatPath(veMusicStore.currentMusic?.previewUrl ?? '', 'veMusic')
      && form.value.previewUrl?.length > 0
})

const editVideoVisible = computed(() => {
  return form.value.videoUrl !== formatPath(veMusicStore.currentMusic?.videoClipUrl ?? '', 'veMusic')
      && form.value.videoUrl?.length > 0
})

const showDeleteError = async (err: any, label: string) => {
  await showError(
      'Ошибка редактирования url',
      `Не удалось редактировать url для ${label}.. Ошибка: ${err?.detail}`
  )
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
    form.value.previewUrl = formatPath(veMusicStore.currentMusic.previewUrl ?? '', 'veMusic')
    form.value.videoUrl = formatPath(veMusicStore.currentMusic.videoClipUrl ?? '', 'veMusic')
  }
})
</script>

<template>

  <form novalidate class="flex flex-col gap-5 w-full">
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