<script setup lang="ts">
import {ref} from "vue";

import {useSignal} from "@composables/useSignal.ts";

import UserAvatar from "@components/user/UserAvatar.vue";
import UserForm from "@components/user/UserForm.vue";
import UserActions from "@components/user/UserActions.vue";

const signal = useSignal()

const confirmTitle = 'Редактирование профиля'
const errorTitle = 'Ошибка редактирования профиля'

const isLoading = ref(false)
</script>

<template>

  <div class="h-full flex items-center justify-center">
    <div class="grid grid-cols-2 gap-[1.2rem] w-3/4 3xl:w-1/2">
      <UserAvatar v-model:is-loading="isLoading"
                  :confirm-title="confirmTitle"
                  :error-title="errorTitle"
                  :signal="signal"
      />

      <div class="flex flex-col gap-[1.2rem]">
        <UserForm v-model:is-loading="isLoading"
                  :confirm-title="confirmTitle"
                  :error-title="errorTitle"
                  :signal="signal"
        />

        <UserActions :is-loading="isLoading"/>
      </div>
    </div>
  </div>

</template>