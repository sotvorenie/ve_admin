<script setup lang="ts">
import {onBeforeMount, ref} from "vue";

import {ArtistsListType, ArtistType} from "@/types/artist.ts";

import {apiGetArtists} from "@api/veMusic/artist.ts";

import {pluralize} from "@composables/usePluralize.ts";
import {useSignal} from "@composables/useSignal.ts";
import {showError} from "@utils/modals.ts";

import Modal from "@ui/Modal.vue";
import ButtonUi from "@ui/ButtonUi.vue";
import Icon from "@ui/Icon.vue";
import InputUi from "@ui/InputUi.vue";

import NotImageIcon from "@icons/NotImageIcon.vue";
import SearchIcon from "@icons/SearchIcon.vue";

import useApiUrlStore from "@store/useApiUrlStore.ts";
const apiUrlStore = useApiUrlStore();

const artists = defineModel<number[]>('artists', {required: true})

const signal = useSignal()

const isLoading = ref<boolean>(true)

const isVisible = ref<boolean>(false)

const artistsList = ref<ArtistType[]>([])

const searchName = ref<string>('')

const page = ref<number>(1)

const getArtists = async () => {
  try {
    isLoading.value = true

    const response: ArtistsListType = await apiGetArtists(
        searchName.value,
        page.value,
        30,
        signal
    )
    if (response) {
      page.value = response.page
      artistsList.value = response.artists
    }
  } catch (err: any) {
    await showError(
        'Ошибка загрузки исполнителей',
        `Не удалось загрузить исполнителей.. Ошибка: ${err?.detail}`
    )
  } finally {
    isLoading.value = false
  }
}

const handleArtist = (id: number) => {
  if (artists.value?.includes(id)) {
    artists.value = artists.value.filter(a => a !== id)
  } else {
    artists.value.push(id)
  }
}

const isSelected = (id: number) => {
  return artists.value?.includes(id)
}

const handleCancel = () => {
  artists.value = []
  isVisible.value = false
}

onBeforeMount(() => getArtists())
</script>

<template>

  <Modal v-model="isVisible" :size="600">
    <template #activator="{open}">
      <ButtonUi @click="open" class="w-full">
        Выбрать исполнителей
      </ButtonUi>
    </template>

    <template #default="{close}">
      <div class="flex flex-col gap-5">
        <p class="text-sm font-semibold">
          {{pluralize(artists?.length ?? 0, ['Выбран', 'Выбраны', 'Выбрано'])}} {{artists?.length}} {{pluralize(artists?.length ?? 0, ['исполнитель', 'исполнителя', 'исполнителей'])}}
        </p>

        <InputUi v-model="searchName"
                 placeholder="Поиск по исполнителям.."
                 :disabled="isLoading"
                 :action-btn="{
                      icon: SearchIcon,
                      func: () => getArtists(),
                      visible: !!searchName?.length
                   }"
                 @keydown.enter="getArtists"
        />

        <ul class="flex flex-col gap-2.5">
          <li v-for="artist in artistsList"
              :key="artist.id"
              class="flex items-center justify-between gap-5 px-4 py-2.5 border border-white rounded-xl cursor-pointer hover:border-accent transition-colors"
              :class="isSelected(artist.id) && 'border-accent'"
              @click="handleArtist(artist.id)"
          >
            <div class="flex items-center gap-5">
              <div class="img-container w-10 aspect-square rounded-full">
                <img v-if="artist?.avatarUrl"
                     :src="`${apiUrlStore.activeUrl}${artist.avatarUrl}`"
                     :alt="artist.name"
                >
                <Icon v-else
                      :name="NotImageIcon"
                      :size="20"
                />
              </div>

              <p class="truncate font-semibold">{{artist.name}}</p>
            </div>

            <div class="w-5 aspect-square rounded-full border border-white flex items-center justify-center">
              <div class="w-1/2 aspect-square rounded-full transition-colors"
                    :class="isSelected(artist.id) && 'bg-accent'"
              />
            </div>
          </li>
        </ul>

        <div v-if="artists?.length" class="grid grid-cols-2 gap-2.5">
          <ButtonUi @click="handleCancel">
            Отмена
          </ButtonUi>

          <ButtonUi @click="close">
            Подтвердить
          </ButtonUi>
        </div>
      </div>
    </template>
  </Modal>

</template>