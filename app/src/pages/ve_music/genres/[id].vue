<script setup lang="ts">
import {computed, onBeforeMount, ref, watchEffect} from "vue";
import {useRoute} from "vue-router";

import {GenreType} from "@/types/genre.ts";

import {apiGetGenre} from "@api/veMusic/genre.ts";

import {useSignal} from "@composables/useSignal.ts";
import {showError} from "@utils/modals.ts";

import VeMusicGenreInfo from "@components/veMusic/genre/VeMusicGenreInfo.vue";
import VeMusicGenreActions from "@components/veMusic/genre/VeMusicGenreActions.vue";
import VeMusicGenreMusic from "@components/veMusic/genre/VeMusicGenreMusic.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();
import usePageStore from "@store/usePageStore.ts";
const pageStore = usePageStore();

const route = useRoute()
const signal = useSignal()

const genreId = computed(() => route.params.id)

const isLoading = ref(false)

const getCurrentGenre = async () => {
  isLoading.value = true

  try {
    const response: GenreType = await apiGetGenre(+genreId.value, signal)

    if (response) veMusicStore.currentGenre = response
  } catch (err: any) {
    await showError(
        'Ошибка получения данных',
        `Не удалось загрузить данные жанра.. Ошибка: ${err.detail}`
    )
  } finally {
    isLoading.value = false
  }
}

onBeforeMount(() => getCurrentGenre())

watchEffect(() => {
  pageStore.pageTitle =
      `Жанр veMusic: (${veMusicStore.currentGenre?.id}) "${veMusicStore.currentGenre?.name}"`
})
</script>

<template>

  <div class="h-full flex items-center justify-center">
    <div class="w-1/2 3xl:w-1/3 flex flex-col gap-5">
      <VeMusicGenreInfo v-model:is-loading="isLoading"
                        :genre-id="+genreId"
                        :signal="signal"
      />

      <VeMusicGenreMusic/>

      <VeMusicGenreActions v-model:is-loading="isLoading"
                           :genre-id="+genreId"
                           :signal="signal"
      />
    </div>
  </div>

</template>