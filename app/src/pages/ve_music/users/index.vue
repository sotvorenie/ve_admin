<script setup lang="ts">
import {onBeforeMount, ref} from "vue";

import {ListHeadType, ListItemType} from "@/types/list.ts";
import {AppUsersResponseType} from "@/types/user.ts";

import {apiGetAllUsers} from "@api/veMusic/user.ts";

import {useSignal} from "@composables/useSignal.ts";
import {showError} from "@utils/modals.ts";

import List from "@common/List.vue";
import Pagination from "@common/Pagination.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();

const signal = useSignal()

const headItems: ListHeadType[] = [
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

const users = ref<ListItemType[]>([])

const page = ref(1)
const total = ref(0)

const isLoading = ref(true)

const setToStore = (user: any) => {
  veMusicStore.currentUser = user
}

const getUsers = async () => {
  isLoading.value = true

  try {
    const response: AppUsersResponseType = await apiGetAllUsers(page.value, 30, signal)

    if (response) {
      page.value = response.page
      total.value = response.total
      users.value = response.users.map(user => ({
        url: `/ve_music/users/${user.id}`,
        info: {
          ...user
        }
      }))
    }
  } catch (err: any) {
    await showError(
        'Ошибка загрузки данных',
        `Не удалось загрузить список пользователей... Ошибка: ${err.message}`
    )
  } finally {
    isLoading.value = false
  }
}

onBeforeMount(() => {
  getUsers()
  veMusicStore.createBtnInfo = {
    label: '',
    to: '',
  }
})
</script>

<template>

  <List :items="users"
        :head-items="headItems"
        cols-style="4rem 8rem 8rem 10rem 1fr 1fr"
        :store-func="setToStore"
        :is-loading="isLoading"
  />

  <Pagination v-model="page" :total="total"/>

</template>