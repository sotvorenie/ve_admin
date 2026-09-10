<script setup lang="ts">
import {type Component, computed, onBeforeMount, ref, watchEffect} from "vue";
import {useRoute} from "vue-router";

import {MusicType} from "@/types/music.ts";

import {apiGetMusic} from "@api/veMusic/music.ts";

import {useSignal} from "@composables/useSignal.ts";
import {showError} from "@utils/modals.ts";

import VeMusicMusicFiles from "@components/veMusic/music/VeMusicMusicFiles.vue";
import VeMusicMusicInfo from "@components/veMusic/music/VeMusicMusicInfo.vue";
import VeMusicMusicAuditions from "@components/veMusic/music/VeMusicMusicAuditions.vue";
import VeMusicMusicUrls from "@components/veMusic/music/VeMusicMusicUrls.vue";
import VeMusicMusicActions from "@components/veMusic/music/VeMusicMusicActions.vue";

import ButtonUi from "@ui/ButtonUi.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();
import usePageStore from "@store/usePageStore.ts";
const pageStore = usePageStore();

const signal = useSignal()
const route = useRoute()

const musicId = computed(() => route.params.id)

const isLoading = ref<boolean>(true)

const activeTab = ref<string>('files')

const tabs = [
  {
    key: 'files',
    label: 'Файлы',
  },
  {
    key: 'info',
    label: 'Информация',
  },
  {
    key: 'auditions',
    label: 'Прослушивания',
  },
  {
    key: 'url',
    label: 'URL-ы файлов',
  },
]

const components: Record<string, Component> = {
  files: VeMusicMusicFiles,
  info: VeMusicMusicInfo,
  auditions: VeMusicMusicAuditions,
  url: VeMusicMusicUrls,
}

const getCurrentMusic = async () => {
  isLoading.value = true

  try {
    const response: MusicType = await apiGetMusic(+musicId.value, signal)

    if (response) veMusicStore.currentMusic = response
  } catch (err: any) {
    await showError(
        'Ошибка получения данных',
        `Не удалось загрузить данные аудио.. Ошибка: ${err.detail}`
    )
  } finally {
    isLoading.value = false
  }
}

onBeforeMount(() => getCurrentMusic())

watchEffect(() => {
  pageStore.pageTitle =
      `Аудио veMusic: (${veMusicStore.currentMusic?.id}) "${veMusicStore.currentMusic?.name}"`
})
</script>

<template>

  <div class="h-100 flex-center">
    <div class="w-75 flex flex-column gap-20">
      <div class="flex gap-10">
        <ButtonUi v-for="tab in tabs"
                  :key="tab.key"
                  @click="activeTab = tab.key"
                  class="text-16"
                  :class="tab.key === activeTab && 'bg-light text-dark pointer-none'"
        >
          {{tab.label}}
        </ButtonUi>
      </div>

      <KeepAlive>
        <Component :is="components[activeTab]"
                   v-model:is-loading="isLoading"
                   :music-id="+musicId"
                   :signal="signal"
        />
      </KeepAlive>

      <VeMusicMusicActions v-model:is-loading="isLoading"
                           :music-id="+musicId"
                           :signal="signal"
      />
    </div>
  </div>

</template>