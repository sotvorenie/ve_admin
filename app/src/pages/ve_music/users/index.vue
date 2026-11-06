<script setup lang="ts">
import {onBeforeMount, ref} from "vue";

import {ListHead, ListItem} from "@/types/list.ts";

import {VeMusicUserService} from "@api/veMusic/VeMusicUserService.ts";

import {useSignal} from "@composables/useSignal.ts";
import {showError} from "@utils/modals.ts";

import List from "@common/List.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();
import usePageStore from "@store/usePageStore.ts";
const pageStore = usePageStore();
import useSearchStore from "@store/useSearchStore.ts";
const searchStore = useSearchStore();

const signal = useSignal()

const headItems: ListHead[] = [
  {
    label: 'id',
    key: 'id',
    type: 'text',
  },
  {
    label: 'Дата создания',
    key: 'createdAt',
    type: 'date',
  },
  {
    label: 'Дата обновления',
    key: 'updatedAt',
    type: 'date',
  },
  {
    label: 'Аватар',
    key: 'avatarUrl',
    type: 'avatar',
  },
  {
    label: 'Имя',
    key: 'name',
    type: 'text',
  },
  {
    label: 'Логин',
    key: 'login',
    type: 'text',
  },
]

const users = ref<ListItem[]>([])

const page = ref(1)
const total = ref(0)

const isLoading = ref(true)

const setToStore = (user: any) => {
  veMusicStore.currentUser = user
}

const getUsers = async () => {
  isLoading.value = true

  try {
    const response = await VeMusicUserService.getUsers(searchStore.searchName, page.value, 30, signal)

    page.value += 1
    total.value = response.meta.total
    users.value = response.data.map(user => ({
      url: `/ve_music/users/${user.id}`,
      info: {
        ...user
      }
    }))
  } catch (err: any) {
    await showError(
        'Ошибка загрузки данных',
        `Не удалось загрузить список пользователей... Ошибка: ${err.detail}`
    )
  } finally {
    isLoading.value = false
  }
}

onBeforeMount(() => {
  pageStore.createBtnInfo = {
    label: 'Добавить пользователя',
    to: '/ve_music/users/create',
  }
  searchStore.searchFunc = () => getUsers()

  getUsers()
})
</script>

<template>

  <List v-model:page="page"
        :items="users"
        :total="total"
        :head-items="headItems"
        cols-style="4rem 8rem 8rem 10rem 1fr 1fr"
        :store-func="setToStore"
        :is-loading="isLoading"
  />

</template>