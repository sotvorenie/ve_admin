<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";

import {showConfirm} from "@utils/modals.ts";
import {logout} from "@utils/auth.ts";

import InputUi from "@ui/InputUi.vue";
import LabelUi from "@ui/LabelUi.vue";
import ButtonUi from "@ui/ButtonUi.vue";

import useUserStore from "@store/useUserStore.ts";
const userStore = useUserStore();

const router = useRouter()

const userName = ref<string>(userStore.user.name)

const handleRedact = async () => {
  const confirm = await showConfirm(
      'Редактирование профиля',
      'Вы действительно хотите изменить имя пользователя?'
  )
  if (confirm) {
    userStore.user.name = userName.value
  }
}

const handleLogout = async () => {
  const confirm = await showConfirm(
      'Выход из профиля',
      'Вы действительно хотите выйти?'
  )
  if (confirm) {
    logout()
    await router.replace('/auth')
  }
}
</script>

<template>

  <div class="user h-100 flex-center">
    <div class="grid-cols-2 gap-20 w-75">
      <div class="user__avatar img-container rounded-20">
        <img :src="`${userStore.user.avatarUrl}?t=${Date.now()}`"
             :alt="userStore.user.name"
        >
      </div>

      <form novalidate class="flex flex-column gap-20">
        <p class="h4 text-w600">Данные пользователя</p>

        <LabelUi for-id="name" text="Имя:">
          <InputUi v-model="userName" id="name"/>
        </LabelUi>

        <div class="flex flex-column gap-10 mt-auto">
          <ButtonUi :disabled="userName === userStore.user.name"
                    @click="handleRedact"
          >
            Редактировать
          </ButtonUi>
          <ButtonUi @click="handleLogout">Выйти</ButtonUi>
        </div>
      </form>
    </div>
  </div>

</template>