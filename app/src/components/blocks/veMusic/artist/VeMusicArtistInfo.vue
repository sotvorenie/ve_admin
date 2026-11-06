<script setup lang="ts">
import {computed} from "vue";

import {ArtistForm} from "@/types/artist.ts";

import {VeMusicArtistService} from "@api/veMusic/VeMusicArtistService.ts";

import {formatPath} from "@composables/useFormatPath.ts";

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

const form = defineModel<ArtistForm>('form', {required: true})
const isLoading = defineModel<boolean>('isLoading', {default: true})

const editUrlVisible = computed(() => {
  return form.value.avatarUrl !== formatPath(veMusicStore.currentArtist?.avatarUrl ?? '', 'veMusic')
      && form.value.avatarUrl?.length > 0
})

const showErr = async (err: any, label: string) => {
  await showError(
      'Ошибка редактирования исполнителя',
      `Не удалось редактировать ${label} исполнителя.. Ошибка: ${err?.detail}`
  )
}

const handleUpdateName = async () => {
  if (form.value.name === veMusicStore.currentUser?.name) return

  const confirm = await showConfirm(
      'Редактирование данных исполнителя',
      'Вы действительно хотите редактировать имя исполнителя?'
  )
  if (confirm) await updateName()
}

const updateName = async () => {
  try {
    isLoading.value = true

    await VeMusicArtistService.updateName(props.artistId, form.value.name, props.signal)
    veMusicStore.currentArtist!.name = form.value.name
  } catch (err: any) {
    await showErr(err, 'имя')
  } finally {
    isLoading.value = false
  }
}

const handleRedactUrl = async () => {
  if (form.value.name === veMusicStore.currentUser?.name) return

  const confirm = await showConfirm(
      'Редактирование данных исполнителя',
      'Вы действительно хотите редактировать url аватарки исполнителя?'
  )
  if (confirm) await redactUrl()
}

const redactUrl = async () => {
  try {
    isLoading.value = true

    const response = await VeMusicArtistService.updateAvatarPath(props.artistId, form.value.avatarUrl, props.signal)

    veMusicStore.currentArtist!.avatarUrl = response.url
  } catch (err: any) {
    await showErr(err, 'аватар')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>

  <form novalidate class="flex flex-col gap-2.5">
    <LabelUi text="Имя:">
      <InputUi v-model="form.name"
               minlength="4"
               maxlength="20"
               :disabled="isLoading"
               :action-btn="{
                      icon: EditIcon,
                      func: () => handleUpdateName(),
                      visible: veMusicStore.currentArtist?.name !== form.name
                   }"
      />
    </LabelUi>

    <LabelUi text="Url аватарки:">
      <InputUi v-model="form.avatarUrl"
               :disabled="isLoading"
               :action-btn="{
                      icon: EditIcon,
                      func: () => handleRedactUrl(),
                      visible: editUrlVisible
                   }"
      />
    </LabelUi>
  </form>

</template>