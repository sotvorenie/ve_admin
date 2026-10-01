<script setup lang="ts">
import {type Component, ref} from "vue";

import {MusicForListType} from "@/types/music.ts";

import {apiAddMusicToUserLike, apiDeleteMusicFromUserLike, apiGetUserLikeMusic} from "@api/veMusic/like.ts";

import {useSignal} from "@composables/useSignal.ts";
import {showConfirm, showError} from "@utils/modals.ts";

import VeMusicList from "@components/veMusic/VeMusicList.vue";
import VeMusicUserLikesUsers from "@components/veMusic/user/VeMusicUserLikesUsers.vue";
import VeMusicUserLikesMusic from "@components/veMusic/user/VeMusicUserLikesMusic.vue";

import Modal from "@ui/Modal.vue";
import ButtonUi from "@ui/ButtonUi.vue";

defineProps<{
  userId: number
}>()

const signal = useSignal()

const tabs = [
  {
    key: 'user',
    label: 'Пользователь',
  },
  {
    key: 'music',
    label: 'Музыка',
  },
]

const components: Record<string, Component> = {
  user: VeMusicUserLikesUsers,
  music: VeMusicUserLikesMusic,
}

const activeTab = ref(tabs[0].key)
const isLoading = ref(true)

const activeUserId = ref<number>(-1)
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

    await apiAddMusicToUserLike(activeMusic.value.id, activeUserId.value, signal)
    musicList.value = musicList.value.filter(music => music.id !== activeMusic.value!.id)
    musicList.value = [activeMusic.value, ...musicList.value]
    activeMusic.value = null
    activeUserId.value = -1
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
          <div class="grid grid-cols-2 gap-2.5">
            <ButtonUi v-for="tab in tabs"
                      :key="tab.key"
                      :class="activeTab === tab.key && 'bg-white text-text'"
                      :disabled="activeTab === tab.key"
                      @click="activeTab = tab.key"
            >
              {{tab?.label}}
            </ButtonUi>
          </div>

          <Component :is="components[activeTab]"
                     v-model:is-loading="isLoading"
                     v-model:user-id="activeUserId"
                     v-model:active-music="activeMusic"
          />

          <div class="grid grid-cols-2 gap-2.5">
            <ButtonUi @click="close">
              Отмена
            </ButtonUi>

            <ButtonUi :is-loading="isLoading"
                      :disabled="activeUserId < 0 && (activeMusic?.id ?? -1) < 0"
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
                 :user-id="userId"
    />
  </div>

</template>