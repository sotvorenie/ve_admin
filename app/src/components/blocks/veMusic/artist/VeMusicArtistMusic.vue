<script setup lang="ts">
import {ref} from "vue";

import {ListItemType} from "@/types/list.ts";
import {MusicListType} from "@/types/music.ts";

import {musicColsStyle, musicHeadItems} from "@data/music.ts";

import {apiGetAllArtistMusic} from "@api/veMusic/artist.ts";

import {useSignal} from "@composables/useSignal.ts";
import {showError} from "@utils/modals.ts";

import List from "@common/List.vue";
import Pagination from "@common/Pagination.vue";

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
  if (!veMusicStore.currentArtist) return

  try {
    isLoading.value = true

    const response: MusicListType = await apiGetAllArtistMusic(veMusicStore.currentArtist.id, page.value, 30, signal)
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
        'Ошибка получения музыки исполнителя',
        `Не удалось загрузить музыку исполнителя.. Ошибка: ${err?.detail}`
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
        Треки исполнителя
      </ButtonUi>
    </template>

    <template #default>
      <p class="text-20 text-w600 mb-12 text-center">Треки исполнителя</p>

      <List :head-items="musicHeadItems"
            :items="music"
            :cols-style="musicColsStyle"
            :is-loading="isLoading"
      />

      <Pagination v-model="page" :total="total"/>
    </template>
  </Modal>

</template>