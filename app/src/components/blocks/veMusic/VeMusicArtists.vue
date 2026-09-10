<script setup lang="ts">
import {onBeforeMount, ref} from "vue";

import {ArtistsListType, ArtistType} from "@/types/artist.ts";

import {apiGetArtists} from "@api/veMusic/artist.ts";

import {pluralize} from "@composables/usePluralize.ts";
import {debounce} from "@composables/useDebounce.ts";
import {useSignal} from "@composables/useSignal.ts";
import {showError} from "@utils/modals.ts";

import Modal from "@ui/Modal.vue";
import ButtonUi from "@ui/ButtonUi.vue";
import Icon from "@ui/Icon.vue";
import InputUi from "@ui/InputUi.vue";

import NotImageIcon from "@icons/NotImageIcon.vue";
import SearchIcon from "@icons/SearchIcon.vue";

const artists = defineModel<number[]>('artists', {required: true})

const signal = useSignal()

const isLoading = ref<boolean>(true)

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
      page.value = response.page + 1
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

onBeforeMount(() => getArtists())
</script>

<template>

  <Modal :size="600">
    <template #activator="{open}">
      <ButtonUi @click="() => {
                  open()
                  }"
      >
        Выбрать исполнителей
      </ButtonUi>
    </template>

    <template #default>
      <div class="flex flex-column gap-20">
        <p class="text-14 text-w600">
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
                 @update:model-value="() => debounce(getArtists, 500)"
        />

        <ul class="flex flex-column gap-10">
          <li v-for="artist in artistsList"
              :key="artist.id"
              class="flex align-center justify-between gap-20 px-16 py-10 border border-light-alt rounded-12 cursor-pointer hover:border-accent transition-colors"
              :class="isSelected(artist.id) && 'border-accent'"
              @click="handleArtist(artist.id)"
          >
            <div class="flex align-center gap-20">
              <div class="square-40 rounded-full img-container flex-center">
                <img v-if="artist?.avatarUrl"
                     :src="artist.avatarUrl"
                     :alt="artist.name"
                >
                <Icon v-else
                      :name="NotImageIcon"
                      :size="20"
                />
              </div>

              <p class="text-ellipsis text-w600">{{artist.name}}</p>
            </div>

            <div class="square-20 rounded-full border border-light-alt flex-center">
              <div class="w-50 aspect-1 rounded-full transition-colors"
                    :class="isSelected(artist.id) && 'bg-accent'"
              />
            </div>
          </li>
        </ul>
      </div>
    </template>
  </Modal>

</template>