<script setup lang="ts">
import {type Component, computed, onBeforeMount, ref, watchEffect} from "vue";
import {useRoute} from "vue-router";

import {AppUserType} from "@/types/user.ts";

import {apiGetUser} from "@api/veMusic/user.ts";

import {useSignal} from "@composables/useSignal.ts";
import {showError} from "@utils/modals.ts";

import VeMusicUserData from "@components/veMusic/user/VeMusicUserData.vue";
import VeMusicUserHistory from "@components/veMusic/user/VeMusicUserHistory.vue";
import VeMusicUserLikes from "@components/veMusic/user/VeMusicUserLikes.vue";

import ButtonUi from "@ui/ButtonUi.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();
import usePageStore from "@store/usePageStore.ts";
const pageStore = usePageStore();

const signal = useSignal()
const route = useRoute()

const userId = computed(() => route.params.id)

const isLoading = ref<boolean>(true)

const activeTab = ref<string>('data')

const tabs = [
  {
    key: 'data',
    label: 'Информация',
  },
  {
    key: 'history',
    label: 'История',
  },
  {
    key: 'likes',
    label: 'Лайки',
  },
]

const components: Record<string, Component> = {
  data: VeMusicUserData,
  history: VeMusicUserHistory,
  likes: VeMusicUserLikes,
}

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
})
</script>

<template>

  <div class="user h-100 flex-center">
    <div class="w-75 flex flex-column gap-20">
      <div class="flex gap-10">
        <ButtonUi v-for="tab in tabs"
                  :key="tab.key"
                  :class="activeTab === tab.key && 'bg-light text-dark pointer-none'"
                  @click="activeTab = tab.key"
        >
          {{tab.label}}
        </ButtonUi>
      </div>

      <KeepAlive>
        <Component :is="components[activeTab]"
                   v-model:is-loading="isLoading"
                   :user-id="+userId"
                   :signal="signal"
                   class="w-100"
        />
      </KeepAlive>
    </div>
  </div>

</template>