<script setup lang="ts">
import {ref, watchEffect} from "vue";

import VeMusicUserAvatar from "@components/veMusic/user/VeMusicUserAvatar.vue";
import VeMusicUserInfo from "@components/veMusic/user/VeMusicUserInfo.vue";
import VeMusicUserActions from "@components/veMusic/user/VeMusicUserActions.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();

defineProps<{
  userId: number
  signal: AbortSignal
}>()

const isLoading = defineModel<boolean>('isLoading', {required: true})

export interface VeMusicUserForm {
  name: string
  login: string
  password: string
}

const form = ref<VeMusicUserForm>({
  name: '',
  login: '',
  password: '',
})

watchEffect(() => {
  if (veMusicStore.currentUser) {
    form.value.name = veMusicStore.currentUser.name
    form.value.login = veMusicStore.currentUser.login
  }
})
</script>

<template>

  <div class="row gap-20 w-100">
    <VeMusicUserAvatar v-model:is-loading="isLoading"
                       :user-id="userId"
                       :signal="signal"
                       class="col-6"
    />

    <div class="flex flex-column justify-between w-100 col-6">
      <VeMusicUserInfo v-model:is-loading="isLoading"
                       v-model:form="form"
                       :user-id="userId"
                       :signal="signal"
      />

      <VeMusicUserActions v-model:is-loading="isLoading"
                          :user-id="userId"
                          :signal="signal"
      />
    </div>
  </div>

</template>