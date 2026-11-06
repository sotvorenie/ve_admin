<script setup lang="ts">
import {onBeforeMount, ref} from "vue";

import {Search} from "@/types/search.ts";

import {VeMusicSearchService} from "@api/veMusic/VeMusicSearchService.ts";

import {useSignal} from "@composables/useSignal.ts";
import {showConfirm, showError} from "@utils/modals.ts";

import Icon from "@ui/Icon.vue";
import ButtonUi from "@ui/ButtonUi.vue";
import Modal from "@ui/Modal.vue";
import LabelUi from "@ui/LabelUi.vue";
import InputUi from "@ui/InputUi.vue";

import DeleteIcon from "@icons/DeleteIcon.vue";
import LoadingIcon from "@icons/LoadingIcon.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();

const signal = useSignal()

const searchList = ref<Search[]>([])

const isLoading = ref<boolean>(true)

const newSearch = ref<string>('')
const newSearchModalVisible = ref<boolean>(false)

const getSearchHistory = async () => {
  try {
    isLoading.value = true

    const response = await VeMusicSearchService.getList(veMusicStore.currentUser!.id, signal)

    searchList.value = response.data
  } catch (err: any) {
    await showError(
        'Ошибка получения истории поиска',
        `Не удалось загрузить список истории поиска.. Ошибка: ${err?.detail}`
    )
  } finally {
    isLoading.value = false
  }
}

const handleDelete = async (id: number) => {
  const confirm = await showConfirm(
      'Удаление элемента истории поиска',
      'Вы действительно хотите удалить элемент?'
  )
  if (confirm) await deleteSearch(id)
}

const deleteSearch = async (id: number) => {
  try {
    await VeMusicSearchService.delete(id, veMusicStore.currentUser!.id, signal)
    searchList.value = searchList.value.filter(s => s.id !== id)
  } catch (err: any) {
    await showError(
        'Ошибка удаления элемента истории поиска',
        `Не удалось удалить элемент.. Ошибка: ${err?.detail}`
    )
  }
}

const handleCreateSearch = async () => {
  const confirm = await showConfirm(
      'Доавление в историю поиска',
      'Вы действительно хотите добавить элемент?'
  )
  if (confirm) await createSearch()
}

const createSearch = async () => {
  try {
    const response = await VeMusicSearchService.create(
        veMusicStore.currentUser!.id,
        newSearch.value,
        signal,
    )

    searchList.value.push(response)
    if (searchList.value?.length > 5) searchList.value.shift()
    newSearchModalVisible.value = false
    newSearch.value = ''
  } catch (err: any) {
    await showError(
        'Ошибка добавления элемента истории поиска',
        `Не удалось добавить элемент.. Ошибка: ${err?.detail}`
    )
  }
}

onBeforeMount(() => getSearchHistory())
</script>

<template>

  <div class="recolor-svg h-full flex flex-col overflow-y-auto overflow-x-hidden scrollbar-thin gap-5 relative">
    <Icon v-if="isLoading"
          :name="LoadingIcon"
          :size="30"
          class="absolute -translate-1/2 top-1/2 left-1/2"
    />

    <template v-else>
      <Modal v-model="newSearchModalVisible" :size="600">
        <template #activator="{open}">
          <ButtonUi @click="open">
            <span class="leading-15">Добавить в историю поиска</span>
          </ButtonUi>
        </template>

        <template #default="{close}">
          <div class="flex flex-col gap-3">
            <LabelUi text="Элемент истории поиска">
              <InputUi v-model="newSearch"
                       @keydown.enter="handleCreateSearch"
              />
            </LabelUi>

            <div class="grid grid-cols-2 gap-2.5">
              <ButtonUi @click="close">
                Отмена
              </ButtonUi>

              <ButtonUi :is-loading="isLoading"
                        :disabled="!veMusicStore.currentUser?.id"
                        @click="handleCreateSearch">
                Добавить
              </ButtonUi>
            </div>
          </div>
        </template>
      </Modal>

      <template v-if="!isLoading && searchList?.length">
        <ul class="flex flex-col gap-2.5 pr-2">
          <li v-for="search in searchList"
              :key="search.id"
              class="p-2 flex justify-between items-center gap-5 border rounded-xl"
          >
            <span>{{search.search}}</span>

            <button class="recolor-svg text-white w-10 aspect-square rounded-full border shrink-0 flex items-center justify-center cursor-pointer transition-colors hover:text-accent"
                    type="button"
                    @click.stop="handleDelete(search.id)"
                    aria-label="Удалить"
                    title="Удалить"
            >
              <Icon :name="DeleteIcon" :size="20"/>
            </button>
          </li>
        </ul>
      </template>

      <p v-else class="text-center m-auto">Истории поиска нет..</p>
    </template>
  </div>

</template>