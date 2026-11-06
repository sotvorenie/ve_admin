<script setup lang="ts">
import {onBeforeMount, ref} from "vue";

import {TrackInfo} from "@/types/music.ts";

import {VeMusicGenreService} from "@api/veMusic/VeMusicGenreService.ts";

import VeMusicArtists from "@components/veMusic/VeMusicArtists.vue";

import InputUi from "@ui/InputUi.vue";
import LabelUi from "@ui/LabelUi.vue";
import SelectUi, {Option} from "@ui/SelectUi.vue";

import CrossIcon from "@icons/CrossIcon.vue";

defineProps<{
  isLoading: boolean
}>()

const form = defineModel<TrackInfo>('form', {required: true})

const genres = ref<Option[]>([])

const getGenres = async () => {
  try {
    const response = await VeMusicGenreService.getAllGenres()

    genres.value = response.data.map(genre => ({
      id: genre.id,
      label: genre.name,
    }))
  } catch {}
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
                :disabled="isLoading"
      />
    </LabelUi>

    <VeMusicArtists v-model:artists="form.artistsIds" :disabled="isLoading"/>
  </form>

</template>