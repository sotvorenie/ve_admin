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

  <div class="user h-100 flex-center">
    <div class="flex gap-20">
      <UserAvatar v-model:is-loading="isLoading"
                  :confirm-title="confirmTitle"
                  :error-title="errorTitle"
                  :signal="signal"
      />

      <div class="flex flex-column gap-20">
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