<script setup lang="ts">
import {onBeforeMount, ref} from "vue";

import {MusicForm} from "@/types/music.ts";

import {VeMusicGenreService} from "@api/veMusic/VeMusicGenreService.ts";

import VeMusicArtists from "@components/veMusic/VeMusicArtists.vue";

import InputUi from "@ui/InputUi.vue";
import LabelUi from "@ui/LabelUi.vue";
import SelectUi, {Option} from "@ui/SelectUi.vue";

import CrossIcon from "@icons/CrossIcon.vue";

defineProps<{
  isLoading: boolean
}>()

const form = defineModel<MusicForm>('form', {required: true})

const genres = ref<Option[]>([])

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

onBeforeMount(() => getGenres())
</script>

<template>

  <form novalidate class="flex flex-col gap-5 w-full">
    <LabelUi text="Название трека:">
      <InputUi v-model="form.info.title"
               :disabled="isLoading"
               maxlength="255"
               :action-btn="{
                      icon: CrossIcon,
                      func: () => form.info.title = '',
                      visible: !!form.info.title?.length
                   }"
      />
    </LabelUi>

    <LabelUi text="Жанр трека:">
      <SelectUi v-model="form.info.genre"
                :options="genres"
                placeholder="Выберите жанр"
                :disabled="isLoading"
      />
    </LabelUi>

    <VeMusicArtists v-model:artists="form.info.artistsIds" :disabled="isLoading"/>
  </form>

</template>