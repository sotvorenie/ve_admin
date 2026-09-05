<script setup lang="ts">
import {computed, onBeforeMount, ref, watchEffect} from "vue";
import {useRoute} from "vue-router";

import {MusicForListType} from "@/types/music.ts";

import {apiGetMusic} from "@api/veMusic/music.ts";

import {useSignal} from "@composables/useSignal.ts";
import {showError} from "@utils/modals.ts";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();
import usePageStore from "@store/usePageStore.ts";
const pageStore = usePageStore();

const signal = useSignal()
const route = useRoute()

const musicId = computed(() => route.params.id)

const isLoading = ref<boolean>(true)

const getCurrentMusic = async () => {
  isLoading.value = true

  try {
    const response: MusicForListType = await apiGetMusic(+musicId.value, signal)

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

  <div class="music h-100 flex-center">

  </div>

</template>