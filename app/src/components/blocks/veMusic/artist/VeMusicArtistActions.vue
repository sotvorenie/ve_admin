<script setup lang="ts">
import {useRouter} from "vue-router";

import {apiDeleteArtist} from "@api/veMusic/artist.ts";

import {showConfirm, showError} from "@utils/modals.ts";

import VeMusicArtistMusic from "@components/veMusic/artist/VeMusicArtistMusic.vue";

import ButtonUi from "@ui/ButtonUi.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();

const props = defineProps<{
  artistId: number
  signal: AbortSignal
}>()

const router = useRouter()

const isLoading = defineModel<boolean>('isLoading', {default: true})

const handleDelete = async () => {
  const confirm = await showConfirm(
      'Удаление исполнителя',
      'Вы действительно хотите удалить исполнителя?'
  )

  if (confirm) await deleteUser()
}

const deleteUser = async () => {
  try {
    isLoading.value = true

    await apiDeleteArtist(props.artistId, props.signal)
    await router.replace('/ve_music/artists')
  } catch (err: any) {
    await showError(
        'Ошибка удаления исполнителя',
        `Не удалось удалить исполнителя.. Ошибка: ${err?.detail}`
    )
  } finally {
    isLoading.value = false
  }
}

const handleCancel = () => {
  veMusicStore.currentArtist = null
  router.back()
}
</script>

<template>

  <div class="flex flex-column gap-10">
    <VeMusicArtistMusic/>

    <ButtonUi :disabled="isLoading"
              @click="handleDelete"
    >
      Удалить исполнителя
    </ButtonUi>

    <ButtonUi :disabled="isLoading"
              @click="handleCancel"
    >
      Отмена
    </ButtonUi>
  </div>

</template>