<script setup lang="ts">
import {ref} from "vue";

import {MusicForListType} from "@/types/music.ts";

import {apiAddMusicToUserLike, apiDeleteMusicFromUserLike, apiGetUserLikeMusic} from "@api/veMusic/like.ts";

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

const activeMusic = ref<MusicForListType | null>(null)

const musicList = ref<MusicForListType[]>([])

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

    await apiAddMusicToUserLike(activeMusic.value.id, veMusicStore.currentUser!.id, signal)
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

  <div class="flex flex-col gap-4">
    <Modal :size="600">
      <template #activator="{open}">
        <ButtonUi @click="open">
          Добавить в избранное
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
                 :get-func="apiGetUserLikeMusic"
                 :delete-func="apiDeleteMusicFromUserLike"
    />
  </div>

</template>