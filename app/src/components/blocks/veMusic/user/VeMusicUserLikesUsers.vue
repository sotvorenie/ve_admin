<script setup lang="ts">
import {onBeforeMount, ref} from "vue";

import {AppUsersResponseType, AppUserType} from "@/types/user.ts";

import {apiGetAllUsers} from "@api/veMusic/user.ts";

import {useSignal} from "@composables/useSignal.ts";
import {showError} from "@utils/modals.ts";

import Icon from "@ui/Icon.vue";
import InputUi from "@ui/InputUi.vue";

import SearchIcon from "@icons/SearchIcon.vue";
import NotImageIcon from "@icons/NotImageIcon.vue";

import useApiUrlStore from "@store/useApiUrlStore.ts";
const apiUrlStore = useApiUrlStore();

const isLoading = defineModel<boolean>('isLoading')
const userId = defineModel<number>('userId')

const signal = useSignal()

const users = ref<AppUserType[]>([])

const searchName = ref<string>('')
const page = ref<number>(1)

const getUsers = async () => {
  isLoading.value = true

  try {
    const response: AppUsersResponseType = await apiGetAllUsers(searchName.value, page.value, 30, signal)

    if (response) {
      page.value = response.page
      users.value = response.users
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

const handleUser = (id: number) => {
  userId.value = userId.value === id ? -1 : id
}

onBeforeMount(() => getUsers())
</script>

<template>

  <div class="flex flex-col gap-4">
    <InputUi v-model="searchName"
             placeholder="Поиск по пользователям.."
             :disabled="isLoading"
             :action-btn="{
                      icon: SearchIcon,
                      func: () => getUsers(),
                      visible: !!searchName?.length
                   }"
             @keydown.enter="getUsers"
    />

    <div class="flex flex-col gap-2">
      <div v-for="user in users"
           :key="user.id"
           class="flex items-center justify-between gap-2 px-4 py-2.5 border rounded-xl cursor-pointer hover:border-accent transition-colors"
           :class="userId === user?.id && 'border-accent'"
           @click="handleUser(user.id)"
      >
        <div class="flex items-center gap-2 flex-1 min-w-0">
          <div class="img-container w-10 aspect-square rounded-full">
            <img v-if="user?.avatarUrl"
                 :src="`${apiUrlStore.activeUrl}${user?.avatarUrl}`"
                 :alt="user?.name"
            >
            <Icon v-else
                  :name="NotImageIcon"
                  :size="20"
            />
          </div>

          <p class="truncate font-semibold">{{user?.name}}</p>
        </div>

        <div class="w-5 aspect-square rounded-full border border-white flex items-center shrink-0 justify-center">
          <div class="w-1/2 aspect-square rounded-full transition-colors"
               :class="userId === user?.id && 'bg-accent'"
          />
        </div>
      </div>
    </div>
  </div>

</template>