<script setup lang="ts">
import {ref, watchEffect} from "vue";

import {UserRole} from "@/types/user.ts";

import VeMusicUserAvatar from "@components/veMusic/user/VeMusicUserAvatar.vue";
import VeMusicUserInfo from "@components/veMusic/user/VeMusicUserInfo.vue";
import VeMusicUserActions from "@components/veMusic/user/VeMusicUserActions.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();

defineProps<{
  signal: AbortSignal
}>()

const isLoading = defineModel<boolean>('isLoading', {required: true})

export interface VeMusicUserForm {
  name: string
  login: string
  password: string
  role: UserRole
}

const form = ref<VeMusicUserForm>({
  name: '',
  login: '',
  password: '',
  role: UserRole.USER,
})

watchEffect(() => {
  if (veMusicStore.currentUser) {
    form.value.name = veMusicStore.currentUser.name
    form.value.login = veMusicStore.currentUser.login
    form.value.role = veMusicStore.currentUser.role
  }
})
</script>

<template>

  <div class="grid grid-cols-2 gap-5 w-full">
    <VeMusicUserAvatar v-model:is-loading="isLoading"
                       :signal="signal"
    />

    <div class="flex flex-col justify-between w-full">
      <VeMusicUserInfo v-model:is-loading="isLoading"
                       v-model:form="form"
                       :signal="signal"
      />

      <VeMusicUserActions v-model:is-loading="isLoading"
                          :signal="signal"
      />
    </div>
  </div>

</template>