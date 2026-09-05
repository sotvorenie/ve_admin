<script setup lang="ts">
import {computed, onBeforeMount, ref, watchEffect} from "vue";
import {useRoute} from "vue-router";

import {AppUserType} from "@/types/user.ts";

import {apiGetUser} from "@api/veMusic/user.ts";

import {useSignal} from "@composables/useSignal.ts";
import {showError} from "@utils/modals.ts";

import VeMusicUserAvatar from "@components/veMusic/VeMusicUserAvatar.vue";
import VeMusicUserInfo from "@components/veMusic/VeMusicUserInfo.vue";
import VeMusicUserActions from "@components/veMusic/VeMusicUserActions.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();
import usePageStore from "@store/usePageStore.ts";
const pageStore = usePageStore();

export interface VeMusicUserForm {
  name: string
  login: string
  password: string
}

const signal = useSignal()
const route = useRoute()

const userId = computed(() => route.params.id)

const form = ref<VeMusicUserForm>({
  name: veMusicStore.currentUser?.name ?? '',
  login: veMusicStore.currentUser?.login ?? '',
  password: '',
})

const isLoading = ref<boolean>(true)

const getCurrentUser = async () => {
  isLoading.value = true

  try {
    const response: AppUserType = await apiGetUser(+userId.value, signal)

    if (response) veMusicStore.currentUser = response
  } catch (err: any) {
    await showError(
        'Ошибка получения данных',
        `Не удалось загрузить данные пользователя.. Ошибка: ${err.detail}`
    )
  } finally {
    isLoading.value = false
  }
}

onBeforeMount(() => getCurrentUser())

watchEffect(() => {
  pageStore.pageTitle =
      `Пользователь veMusic: (${veMusicStore.currentUser?.id}) "${veMusicStore.currentUser?.name}"`

  if (veMusicStore.currentUser) {
    form.value.name = veMusicStore.currentUser.name
    form.value.login = veMusicStore.currentUser.login
  }
})
</script>

<template>

  <div class="user h-100 flex-center">
    <div class="flex gap-20">
      <VeMusicUserAvatar :is-loading="isLoading"/>

      <div class="flex flex-column justify-between">
        <VeMusicUserInfo v-model:is-loading="isLoading"
                         v-model:form="form"
        />

        <VeMusicUserActions v-model:is-loading="isLoading"/>
      </div>
    </div>
  </div>

</template>