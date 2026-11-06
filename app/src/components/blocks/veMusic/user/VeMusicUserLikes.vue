<script setup lang="ts">
import {ref} from "vue";

import {TrackPreview} from "@/types/music.ts";

import {VeMusicLikeService} from "@api/veMusic/VeMusicLikeService.ts";

import {useSignal} from "@composables/useSignal.ts";
import {showConfirm, showError} from "@utils/modals.ts";

import VeMusicList from "@components/veMusic/user/VeMusicList.vue";
import VeMusicUserLikesMusic from "@components/veMusic/user/VeMusicUserLikesMusic.vue";

import Modal from "@ui/Modal.vue";
import ButtonUi from "@ui/ButtonUi.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();

const signal = useSignal()

const isLoading = ref(true)

const activeMusic = ref<TrackPreview | null>(null)

const musicList = ref<TrackPreview[]>([])

const handleLike = async (funcClose: Function) => {
  const confirm = await showConfirm(
      'Добавление в избранное',
      'Вы действительно хотите добавить трек в избранное?'
  )

  if (confirm) await like(funcClose)
}

const like = async (funcClose: Function) => {
  try {
    if (!activeMusic.value) return

    isLoading.value = true

    await VeMusicLikeService.like(activeMusic.value.id, veMusicStore.currentUser!.id, signal)
    musicList.value = musicList.value.filter(music => music.id !== activeMusic.value!.id)
    musicList.value = [activeMusic.value, ...musicList.value]
    activeMusic.value = null
    veMusicStore.currentUser!.id = -1
    funcClose()
  } catch (err: any) {
    await showError(
        'Ошибка добавления в избраннное..',
        `Не удалось добавить трек в избранное.. Ошибка: ${err?.detail}`
    )
  } finally {
    isLoading.value = false
  }
}
</script>

<template>

  <Modal :size="600">
    <template #activator="{open}">
      <ButtonUi @click="open">
          <span class="leading-15">
            Добавить в избранное
          </span>
      </ButtonUi>
    </template>

    <template #default="{close}">
      <div class="flex flex-col gap-3">
        <VeMusicUserLikesMusic v-model:is-loading="isLoading"
                               v-model:active-music="activeMusic"
        />

        <div class="grid grid-cols-2 gap-2.5">
          <ButtonUi @click="close">
            Отмена
          </ButtonUi>

          <ButtonUi :is-loading="isLoading"
                    :disabled="!veMusicStore.currentUser?.id || (activeMusic?.id ?? -1) < 0"
                    @click="handleLike(close)">
            Добавить
          </ButtonUi>
        </div>
      </div>
    </template>
  </Modal>

  <VeMusicList v-model:music-list="musicList"
               :get-func="VeMusicLikeService.getLikedTracks"
               :delete-func="VeMusicLikeService.delete"
  />

</template>