<script setup lang="ts">
import {ref} from "vue";

import {ListItem} from "@/types/list.ts";

import {VeMusicGenreService} from "@api/veMusic/VeMusicGenreService.ts";

import {musicColsStyle, musicHeadItems} from "@data/music.ts";

import {useSignal} from "@composables/useSignal.ts";
import {showError} from "@utils/modals.ts";

import List from "@common/List.vue";

import Modal from "@ui/Modal.vue";
import ButtonUi from "@ui/ButtonUi.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();

const signal = useSignal()

const isLoading = ref<boolean>(true)

const music = ref<ListItem[]>([])

const page = ref(1)
const total = ref(0)

const getTracks = async () => {
  if (!veMusicStore.currentGenre) return

  try {
    isLoading.value = true

    const response = await VeMusicGenreService.getGenreMusic(veMusicStore.currentGenre.id, page.value, 30, signal)

    page.value += 1
    total.value = response.meta.total
    music.value = response.data.map(m => ({
      url: `/ve_music/music/${m.id}`,
      info: {
        ...m
      }
    }))
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