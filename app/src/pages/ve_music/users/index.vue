<script setup lang="ts">
import {onBeforeMount, ref} from "vue";

import {ListHeadType, ListItemType} from "@/types/list.ts";
import {AppUsersResponse} from "@/types/user.ts";

import {getAllUsers} from "@api/users/veMusic.ts";

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

const colsStyle = '4rem 10rem 1fr 1fr'

const page = ref(1)
const total = ref(0)

const isLoading = ref(true)

const setToStore = (user: any) => {
  veMusicStore.currentUser = user
}

const getUsers = async () => {
  isLoading.value = true

  try {
    const response: AppUsersResponse = await getAllUsers(page.value, 30, signal)

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

onBeforeMount(() => getUsers())
</script>

<template>

  <List :items="users"
        :head-items="headItems"
        :cols-style="colsStyle"
        :store-func="setToStore"
        :is-loading="isLoading"
  />

  <Pagination v-model="page" :total="total"/>

</template>