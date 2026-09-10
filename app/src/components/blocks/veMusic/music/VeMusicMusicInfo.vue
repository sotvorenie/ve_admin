<script setup lang="ts">
import {computed, onBeforeMount, ref, watchEffect} from "vue";

import {GenresListType} from "@/types/genre.ts";
import {MusicInfoType} from "@/types/music.ts";

import {apiGetAllGenres} from "@api/veMusic/genre.ts";
import {apiRedactMusic} from "@api/veMusic/music.ts";

import {showConfirm, showError} from "@utils/modals.ts";

import VeMusicArtists from "@components/veMusic/VeMusicArtists.vue";

import InputUi from "@ui/InputUi.vue";
import LabelUi from "@ui/LabelUi.vue";
import SelectUi, {Option} from "@ui/SelectUi.vue";
import ButtonUi from "@ui/ButtonUi.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();

const props = defineProps<{
  musicId: number
  signal: AbortSignal
}>()

const isLoading = defineModel<boolean>('isLoading', {required: true})

const form = ref<MusicInfoType>({
  title: veMusicStore.currentMusic?.name ?? '',
  genre: veMusicStore.currentMusic?.genreId ?? -1,
  artistsIds: veMusicStore.currentMusic?.artists?.map(a => a.id) ?? [],
})

const visibleRedactBtn = computed(() => {
  return form.value.title?.length > 0 && form.value.genre && form.value.artistsIds?.length > 0
})

const genres = ref<Option[]>([])

const getGenres = async () => {
  try {
    const response: GenresListType = await apiGetAllGenres()
    if (response) {
      genres.value = response.genres.map(genre => ({
        id: genre.id,
        label: genre.name,
      }))
    }
  } catch {}
}

const handleRedact = async () => {
  const confirm = await showConfirm(
      'Редактирование музыки',
      'Вы действительно хотите редактировать информацию о музыке?'
  )
  if (confirm) await redactMusic()
}

const redactMusic = async () => {
  try {
    isLoading.value = true

    await apiRedactMusic(
        props.musicId,
        form.value.title,
        form.value.genre,
        form.value.artistsIds,
        props.signal
    )
  } catch (err: any) {
    await showError(
        'Ошибка редактирования музыки',
        `Не удалось редактировать информацию музыки.. Ошибка: ${err?.detail}`
    )
  } finally {
    isLoading.value = false
  }
}

onBeforeMount(() => getGenres())

watchEffect(() => {
  if (veMusicStore.currentMusic) {
    form.value.title = veMusicStore.currentMusic.name
    form.value.genre = veMusicStore.currentMusic.genreId
    form.value.artistsIds = veMusicStore.currentMusic.artists.map(a => a.id)
  }
})
</script>

<template>

  <form novalidate class="flex flex-column gap-20 w-100">
    <LabelUi text="Название трека:">
      <InputUi v-model="form.title"
               :disabled="isLoading"
               maxlength="255"
               :action-btn="{
                      icon: CrossIcon,
                      func: () => form.title = '',
                      visible: !!form.title?.length
                   }"
      />
    </LabelUi>

    <LabelUi text="Жанр трека:">
      <SelectUi v-model="form.genre"
                :options="genres"
                placeholder="Выберите жанр"
      />
    </LabelUi>

    <div class="gap-10"
         :class="visibleRedactBtn && 'grid-cols-2'"
    >
      <VeMusicArtists v-model:artists="form.artistsIds"/>

      <ButtonUi v-if="visibleRedactBtn" @click="handleRedact">
        Редактировать
      </ButtonUi>
    </div>
  </form>

</template>