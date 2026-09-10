<script setup lang="ts">
import {computed, ref, watchEffect} from "vue";

import {apiRedactAuditionsForMusic} from "@api/veMusic/music.ts";

import {showConfirm, showError} from "@utils/modals.ts";

import EditIcon from "@icons/EditIcon.vue";
import InputUi from "@ui/InputUi.vue";
import LabelUi from "@ui/LabelUi.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();

const props = defineProps<{
  musicId: number
  signal: AbortSignal
}>()

const isLoading = defineModel<boolean>('isLoading', {required: true})

const auditionsCount = ref<number>(0)

const visibleRedactAuditionsBtn = computed(() => {
  return auditionsCount.value !== veMusicStore.currentMusic?.auditionsCount && auditionsCount.value >= 0
})

const handleRedactAuditions = async () => {
  const confirm = await showConfirm(
      'Редактирование прослушиваний',
      'Вы действительно хотите редактировать кол-во прослушиваний?'
  )
  if (confirm) await redactAuditions()
}

const redactAuditions = async () => {
  try {
    isLoading.value = true

    await apiRedactAuditionsForMusic(props.musicId, auditionsCount.value, props.signal)
    veMusicStore.currentMusic!.auditionsCount = auditionsCount.value
  } catch (err: any) {
    await showError(
        'Ошибка редактирования прослушиваний',
        `Не удалось редактирвать кол-во прослушиваний.. Ошибка: ${err?.detail}`
    )
  } finally {
    isLoading.value = false
  }
}

watchEffect(() => {
  if (veMusicStore.currentMusic) {
    auditionsCount.value = veMusicStore.currentMusic?.auditionsCount
  }
})
</script>

<template>

  <LabelUi text="Кол-во прослушиваний:">
    <InputUi v-model="auditionsCount"
             :disabled="isLoading"
             :action-btn="{
                      icon: EditIcon,
                      func: () => handleRedactAuditions(),
                      visible: visibleRedactAuditionsBtn
                   }"
    />
  </LabelUi>

</template>