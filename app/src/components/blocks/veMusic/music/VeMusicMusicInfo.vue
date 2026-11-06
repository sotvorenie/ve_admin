<script setup lang="ts">
import {computed, onBeforeMount, ref} from "vue";

import {TrackInfo} from "@/types/music.ts";
import {Artist} from "@/types/artist.ts";

import {VeMusicGenreService} from "@api/veMusic/VeMusicGenreService.ts";
import {VeMusicMusicService} from "@api/veMusic/VeMusicMusicService.ts";

import {showConfirm, showError} from "@utils/modals.ts";

import VeMusicArtists from "@components/veMusic/VeMusicArtists.vue";

import InputUi from "@ui/InputUi.vue";
import LabelUi from "@ui/LabelUi.vue";
import SelectUi, {Option} from "@ui/SelectUi.vue";

import EditIcon from "@icons/EditIcon.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();

const props = defineProps<{
  musicId: number
  signal: AbortSignal
}>()

const isLoading = defineModel<boolean>('isLoading', {required: true})

const form = ref<TrackInfo>({
  title: veMusicStore.currentMusic?.name ?? '',
  genre: veMusicStore.currentMusic?.genreId ?? -1,
  artistsIds: veMusicStore.currentMusic?.artists?.map((a: Artist) => a.id) ?? [],
})

const genres = ref<Option[]>([])

const visibleNameBtn = computed(() => {
  return !!form.value.title?.length && veMusicStore.currentMusic?.name !== form.value.title
})

const getGenres = async () => {
  try {
    const response = await VeMusicGenreService.getAllGenres()
    if (response) {
      genres.value = response.data.map(genre => ({
        id: genre.id,
        label: genre.name,
      }))
    }
  } catch {}
}

const handleRedactName = async () => {
  const confirm = await showConfirm(
      'Редактирование названия трека',
      'Вы действительно хотите редактировать название трека?'
  )
  if (confirm) await redactMusic()
}

const handleRedactGenre = async () => {
  const confirm = await showConfirm(
      'Редактирование жанра трека',
      'Вы действительно хотите редактировать жанр трека?'
  )
  if (confirm) await redactMusic()
}

const handleRedactArtists = async () => {
  const confirm = await showConfirm(
      'Редактирование исполнителей трека',
      'Вы действительно хотите редактировать исполнителей трека?'
  )
  if (confirm) await redactMusic()
}

const redactMusic = async () => {
  try {
    isLoading.value = true

    await VeMusicMusicService.update(
        props.musicId,
        form.value.title,
        form.value.genre,
        form.value.artistsIds,
        props.signal
    )
    veMusicStore.currentMusic!.name = form.value.title
    veMusicStore.currentMusic!.genreId = form.value.genre
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
</script>

<template>

  <form novalidate class="flex flex-col gap-5 w-full">
    <LabelUi text="Название трека:">
      <InputUi v-model="form.title"
               :disabled="isLoading"
               maxlength="255"
               :action-btn="{
                      icon: EditIcon,
                      func: () => handleRedactName(),
                      visible: visibleNameBtn
                   }"
      />
    </LabelUi>

    <LabelUi text="Жанр трека:">
      <SelectUi :model-value="form.genre"
                @update:model-value="(val) => {
                  form.genre = +val
                  handleRedactGenre()
                }"
                :options="genres"
                placeholder="Выберите жанр"
      />
    </LabelUi>

    <VeMusicArtists :artists="form.artistsIds"
                    @ok-func="(val: any) => {
                      form.artistsIds = val
                      handleRedactArtists()
                    }"
    />
  </form>

</template>