<script setup lang="ts">
import {computed, onBeforeMount, ref, watchEffect} from "vue";
import {useRoute} from "vue-router";

import {ArtistType} from "@/types/artist.ts";

import {apiGetArtist} from "@api/veMusic/artist.ts";

import {useSignal} from "@composables/useSignal.ts";
import {formatPath} from "@composables/useFormatPath.ts";
import {showError} from "@utils/modals.ts";

import VeMusicArtistAvatar from "@components/veMusic/artist/VeMusicArtistAvatar.vue";
import VeMusicArtistInfo from "@components/veMusic/artist/VeMusicArtistInfo.vue";
import VeMusicArtistActions from "@components/veMusic/artist/VeMusicArtistActions.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();
import usePageStore from "@store/usePageStore.ts";
const pageStore = usePageStore();

const signal = useSignal()
const route = useRoute()

export interface ArtistForm {
  name: string
  avatarUrl: string
}

const artistId = computed(() => route.params.id)

const isLoading = ref<boolean>(true)

const form = ref<ArtistForm>({
  name: '',
  avatarUrl: ''
})

const getCurrentArtist = async () => {
  isLoading.value = true

  try {
    const response: ArtistType = await apiGetArtist(+artistId.value, signal)

    if (response) veMusicStore.currentArtist = response
  } catch (err: any) {
    await showError(
        'Ошибка получения данных',
        `Не удалось загрузить данные исполнителя.. Ошибка: ${err.detail}`
    )
  } finally {
    isLoading.value = false
  }
}

onBeforeMount(() => getCurrentArtist())

watchEffect(() => {
  pageStore.pageTitle =
      `Исполнитель veMusic: (${veMusicStore.currentArtist?.id}) "${veMusicStore.currentArtist?.name}"`

  if (veMusicStore.currentArtist) {
    form.value.name = veMusicStore.currentArtist.name
    form.value.avatarUrl = formatPath(veMusicStore.currentArtist?.avatarUrl ?? '', 'veMusic')
  }
})
</script>

<template>

  <div class="user h-100 flex-center">
    <div class="flex gap-20">
      <VeMusicArtistAvatar v-model:is-loading="isLoading"
                           :artist-id="+artistId"
                           :signal="signal"
      />

      <div class="flex flex-column justify-between">
        <VeMusicArtistInfo v-model:form="form"
                           v-model:is-loading="isLoading"
                           :artist-id="+artistId"
                           :signal="signal"

        />

        <VeMusicArtistActions v-model:is-loading="isLoading"
                              :artist-id="+artistId"
                              :signal="signal"
        />
      </div>
    </div>
  </div>

</template>