<script setup lang="ts">
import {onBeforeMount, ref} from "vue";

import {CreateMusicInfo} from "@pages/ve_music/music/create.vue";
import {GenresListType} from "@/types/genre.ts";

import {apiGetAllGenres} from "@api/veMusic/genre.ts";

import VeMusicCreateMusicArtists from "@components/veMusic/createMusic/VeMusicCreateMusicArtists.vue";

import InputUi from "@ui/InputUi.vue";
import LabelUi from "@ui/LabelUi.vue";
import SelectUi, {Option} from "@ui/SelectUi.vue";

import CrossIcon from "@icons/CrossIcon.vue";

defineProps<{
  isLoading: boolean
}>()

const form = defineModel<CreateMusicInfo>('form', {required: true})

const genres = ref<Option[]>([])

const getGenres = async () => {
  try {
    const response: GenresListType = await apiGetAllGenres()
    if (response) {
      genres.value = response.genres.map(genre => ({
        id: genre.name,
        label: genre.name,
      }))
    }
  } catch {}
}

onBeforeMount(() => getGenres())
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

    <VeMusicCreateMusicArtists v-model:artists="form.artistsIds"/>
  </form>

</template>