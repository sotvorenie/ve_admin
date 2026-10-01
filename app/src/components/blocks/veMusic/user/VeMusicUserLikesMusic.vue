<script setup lang="ts">
import {onBeforeMount, ref} from "vue";

import {MusicForListType, MusicListType} from "@/types/music.ts";

import {apiGetAllMusic} from "@api/veMusic/music.ts";

import {useSignal} from "@composables/useSignal.ts";
import {showError} from "@utils/modals.ts";

import Icon from "@ui/Icon.vue";
import InputUi from "@ui/InputUi.vue";

import SearchIcon from "@icons/SearchIcon.vue";
import NotImageIcon from "@icons/NotImageIcon.vue";

import useApiUrlStore from "@store/useApiUrlStore.ts";
const apiUrlStore = useApiUrlStore();

const isLoading = defineModel<boolean>('isLoading')
const activeMusic = defineModel<MusicForListType | null>('activeMusic', {default: null})

const signal = useSignal()

const music = ref<MusicForListType[]>([])

const searchName = ref<string>('')

const page = ref<number>(1)

const getMusic = async () => {
  isLoading.value = true

  try {
    const response: MusicListType = await apiGetAllMusic(
        searchName.value,
        -1,
        -1,
        page.value,
        30,
        signal
    )

    if (response) {
      page.value = response.page
      music.value = response.music
    }
  } catch (err: any) {
    await showError(
        'Ошибка загрузки данных',
        `Не удалось загрузить список пользователей... Ошибка: ${err.detail}`
    )
  } finally {
    isLoading.value = false
  }
}

const handleMusic = (music: MusicForListType) => {
  activeMusic.value = activeMusic.value?.id === music.id ? null : music
}

onBeforeMount(() => getMusic())
</script>

<template>

  <div class="flex flex-col gap-4">
    <InputUi v-model="searchName"
             placeholder="Поиск по пользователям.."
             :disabled="isLoading"
             :action-btn="{
                      icon: SearchIcon,
                      func: () => getMusic(),
                      visible: !!searchName?.length
                   }"
             @keydown.enter="getMusic"
    />

    <div class="flex flex-col gap-2">
      <div v-for="music in music"
           :key="music.id"
           class="flex items-center justify-between gap-2 px-4 py-2.5 border rounded-xl cursor-pointer hover:border-accent transition-colors"
           :class="activeMusic?.id === music?.id && 'border-accent'"
           @click="handleMusic(music)"
      >
        <div class="flex items-center flex-1 min-w-0 gap-2">
          <div class="img-container w-10 aspect-square">
            <img v-if="music?.previewUrl"
                 :src="`${apiUrlStore.activeUrl}${music?.previewUrl}`"
                 :alt="music?.name"
            >
            <Icon v-else
                  :name="NotImageIcon"
                  :size="20"
            />
          </div>

          <p class="truncate font-semibold">{{music?.name}}</p>
        </div>

        <div class="w-5 aspect-square rounded-full border border-white flex items-center justify-center shrink-0">
          <div class="w-1/2 aspect-square rounded-full transition-colors"
               :class="activeMusic?.id === music?.id && 'bg-accent'"
          />
        </div>
      </div>
    </div>
  </div>

</template>