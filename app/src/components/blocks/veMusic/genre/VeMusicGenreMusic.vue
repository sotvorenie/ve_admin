<script setup lang="ts">
import {ref} from "vue";

import {ListItemType} from "@/types/list.ts";
import {MusicListType} from "@/types/music.ts";

import {musicColsStyle, musicHeadItems} from "@data/music.ts";

import {apiGetAllGenreMusic} from "@api/veMusic/genre.ts";

import {useSignal} from "@composables/useSignal.ts";
import {showError} from "@utils/modals.ts";

import List from "@common/List.vue";

import Modal from "@ui/Modal.vue";
import ButtonUi from "@ui/ButtonUi.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();

const signal = useSignal()

const isLoading = ref<boolean>(true)

const music = ref<ListItemType[]>([])

const page = ref(1)
const total = ref(0)

const getTracks = async () => {
  if (!veMusicStore.currentGenre) return

  try {
    isLoading.value = true

    const response: MusicListType = await apiGetAllGenreMusic(veMusicStore.currentGenre.id, page.value, 30, signal)
    if (response) {
      page.value = response.page
      total.value = response.total
      music.value = response.music.map(m => ({
        url: `/ve_music/music/${m.id}`,
        info: {
          ...m
        }
      }))
    }
  } catch (err: any) {
    await showError(
        'Ошибка получения музыки в данном жанре',
        `Не удалось загрузить музыку выбранного жанра.. Ошибка: ${err?.detail}`
    )
  } finally {
    isLoading.value = false
  }
}
</script>

<template>

  <Modal :size="1000">
    <template #activator="{open}">
      <ButtonUi @click="() => {
                    open()
                    getTracks()
                }"
      >
        Треки жанра
      </ButtonUi>
    </template>

    <template #default>
      <p class="text-xl font-semibold mb-3 text-center">Треки жанра</p>

      <List v-model:page="page"
            :total="total"
            :head-items="musicHeadItems"
            :items="music"
            :cols-style="musicColsStyle"
            :is-loading="isLoading"
      />
    </template>
  </Modal>

</template>