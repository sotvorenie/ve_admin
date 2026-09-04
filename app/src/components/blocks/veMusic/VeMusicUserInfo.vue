<script setup lang="ts">
import {VeMusicUserForm} from "@pages/ve_music/users/[id].vue";

import {showConfirm} from "@utils/modals.ts";

import LabelUi from "@ui/LabelUi.vue";
import InputUi from "@ui/InputUi.vue";

import EditIcon from "@icons/EditIcon.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();

const form = defineModel<VeMusicUserForm>('form', {required: true})
const isLoading = defineModel<boolean>('isLoading', {default: true})

const handleRedactName = async () => {
  if (form.value.name === veMusicStore.currentUser?.name) return

  const confirm = await showConfirm(
      'Редактирование данных пользователя',
      'Вы действительно хотите редактировать имя пользователя?'
  )
  if (confirm) {
    isLoading.value = true
  }
}

const handleRedactLogin = async () => {
  if (form.value.login === veMusicStore.currentUser?.login) return

  const confirm = await showConfirm(
      'Редактирование данных пользователя',
      'Вы действительно хотите редактировать логин пользователя?'
  )
  if (confirm) {
    isLoading.value = true
  }
}

const handleRedactPassword = async () => {
  const confirm = await showConfirm(
      'Редактирование данных пользователя',
      'Вы действительно хотите редактировать пароль пользователя?'
  )
  if (confirm) {
    isLoading.value = true
  }
}
</script>

<template>

  <form novalidate class="user__form flex flex-column gap-10">
    <LabelUi text="Имя:">
      <InputUi v-model="form.name"
               minlength="4"
               :disabled="isLoading"
               :action-btn="{
                      icon: EditIcon,
                      func: () => handleRedactName(),
                      visible: veMusicStore.currentUser?.name !== form.name
                   }"
      />
    </LabelUi>

    <LabelUi text="Логин:">
      <InputUi v-model="form.login"
               minlength="4"
               :disabled="isLoading"
               :action-btn="{
                      icon: EditIcon,
                      func: () => handleRedactLogin(),
                      visible: veMusicStore.currentUser?.login !== form.login
                   }"
      />
    </LabelUi>

    <LabelUi text="Пароль:">
      <InputUi v-model="form.password"
               minlength="4"
               :disabled="isLoading"
               :action-btn="{
                      icon: EditIcon,
                      func: () => handleRedactPassword(),
                      visible: form.password?.length >= 4
                   }"
      />
    </LabelUi>
  </form>

</template>