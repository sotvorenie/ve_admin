<script setup lang="ts">
import {apiRedactArtistName} from "@api/veMusic/artist.ts";

import {showConfirm, showError} from "@utils/modals.ts";

import LabelUi from "@ui/LabelUi.vue";
import InputUi from "@ui/InputUi.vue";

import EditIcon from "@icons/EditIcon.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();

const props = defineProps<{
  artistId: number
  signal: AbortSignal
}>()

const name = defineModel<string>('name', {required: true})
const isLoading = defineModel<boolean>('isLoading', {default: true})

const handleRedactName = async () => {
  if (name.value === veMusicStore.currentUser?.name) return

  const confirm = await showConfirm(
      'Редактирование данных исполнителя',
      'Вы действительно хотите редактировать имя исполнителя?'
  )
  if (confirm) await redactName()
}

const redactName = async () => {
  try {
    isLoading.value = true

    await apiRedactArtistName(props.artistId, name.value, props.signal)
    veMusicStore.currentArtist!.name =name.value
  } catch (err: any) {
    await showError(
        'Ошибка редактирования исполнителя',
        `Не удалось редактировать имя исполнителя.. Ошибка: ${err?.detail}`
    )
  } finally {
    isLoading.value = false
  }
}
</script>

<template>

  <form novalidate class="user__form flex flex-column gap-10">
    <LabelUi text="Имя:">
      <InputUi v-model="name"
               minlength="4"
               maxlength="20"
               :disabled="isLoading"
               :action-btn="{
                      icon: EditIcon,
                      func: () => handleRedactName(),
                      visible: veMusicStore.currentArtist?.name !== name
                   }"
      />
    </LabelUi>
  </form>

</template>