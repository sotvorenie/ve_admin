<script setup lang="ts">
import {computed, ref, watchEffect} from "vue";

import {VeMusicMusicService} from "@api/veMusic/VeMusicMusicService.ts";

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

const previewPath = ref<string>('')

const editPreviewVisible = computed(() => {
  return previewPath.value !== formatPath(veMusicStore.currentMusic?.previewUrl ?? '', 'veMusic')
      && previewPath.value?.length > 0
})

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

    const response = await VeMusicMusicService.updatePreviewPath(props.musicId, previewPath.value, props.signal)

    veMusicStore.currentMusic!.previewUrl = response.url
  } catch (err: any) {
    await showError(
        'Ошибка редактирования url',
        `Не удалось редактировать url для постера.. Ошибка: ${err?.detail}`
    )
  } finally {
    isLoading.value = false
  }
}

watchEffect(() => {
  if (veMusicStore.currentMusic) {
    previewPath.value = formatPath(veMusicStore.currentMusic.previewUrl ?? '', 'veMusic')
  }
})
</script>

<template>

  <form novalidate class="flex flex-col gap-5 w-full">
    <LabelUi text="Path обложки:">
      <InputUi v-model="previewPath"
               :disabled="isLoading"
               :action-btn="{
                      icon: EditIcon,
                      func: () => handleRedactPreview(),
                      visible: editPreviewVisible
                   }"
      />
    </LabelUi>
  </form>

</template>