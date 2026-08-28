<script setup lang="ts">
import {computed, onBeforeMount, ref, watchEffect} from "vue";
import {useRoute} from "vue-router";

import {AppUserType} from "@/types/user.ts";

import {getUser} from "@api/users/veMusic.ts";

import {useSignal} from "@composables/useSignal.ts";
import {showError} from "@utils/modals.ts";

import VeMusicUserAvatar from "@components/veMusic/VeMusicUserAvatar.vue";
import VeMusicUserInfo from "@components/veMusic/VeMusicUserInfo.vue";
import VeMusicUserActions from "@components/veMusic/VeMusicUserActions.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();
import usePageStore from "@store/usePageStore.ts";
const pageStore = usePageStore();

const signal = useSignal()

const route = useRoute()

const userId = computed(() => route.params.id)

const userName = ref<string>(veMusicStore.currentUser?.name ?? '')
const userLogin = ref<string>(veMusicStore.currentUser?.login ?? '')

const isLoading = ref<boolean>(true)

const getCurrentUser = async () => {
  isLoading.value = true

  try {
    const response: AppUserType = await getUser(+userId.value, signal)

    if (response) {
      veMusicStore.currentUser = response
      userName.value = veMusicStore.currentUser.name
      userLogin.value = veMusicStore.currentUser.login
    }
  } catch (err: any) {
    await showError(
        'Ошибка получения данных',
        `Не удалось загрузить данные пользователя.. Ошибка: ${err.message}`
    )
  } finally {
    isLoading.value = false
  }
}

onBeforeMount(() => getCurrentUser())

watchEffect(() => {
  pageStore.pageTitle =
      `Пользователь veMusic: (${veMusicStore.currentUser?.id}) "${veMusicStore.currentUser?.name}"`
})
</script>

<template>

  <div class="user h-100 flex-center">
    <div class="flex gap-20">
      <VeMusicUserAvatar :is-loading="isLoading"/>

      <div>
        <VeMusicUserInfo :user-name="userName"
                         :user-login="userLogin"
                         :is-loading="isLoading"
        />

        <VeMusicUserActions :is-loading="isLoading"/>
      </div>
    </div>
  </div>

</template>