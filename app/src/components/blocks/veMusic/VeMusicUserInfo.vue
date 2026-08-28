<script setup lang="ts">
import {ref} from "vue";

import {showConfirm} from "@utils/modals.ts";

import LabelUi from "@ui/LabelUi.vue";
import InputUi from "@ui/InputUi.vue";

import EditIcon from "@icons/EditIcon.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();

const props = defineProps<{
  userName: string
  userLogin: string
  isLoading: boolean
}>()

const userPassword = ref<string>(veMusicStore.currentUser?.password ?? '')

const handleRedactName = async () => {
  if (veMusicStore.currentUser?.name === props.userName) return

  const confirm = await showConfirm(
      'Редактирование данных пользователя',
      'Вы действительно хотите редактировать имя пользователя?'
  )
  if (confirm) {

  }
}

const handleRedactLogin = async () => {
  if (veMusicStore.currentUser?.login === props.userLogin) return

  const confirm = await showConfirm(
      'Редактирование данных пользователя',
      'Вы действительно хотите редактировать логин пользователя?'
  )
  if (confirm) {

  }
}

const handleRedactPassword = async () => {
  if (veMusicStore.currentUser?.password === userPassword.value) return

  const confirm = await showConfirm(
      'Редактирование данных пользователя',
      'Вы действительно хотите редактировать пароль пользователя?'
  )
  if (confirm) {

  }
}
</script>

<template>

  <form novalidate class="user__form flex flex-column gap-10">
    <LabelUi text="Имя:">
      <InputUi v-model="userName"
               minlength="4"
               :disabled="isLoading"
               :action-btn="{
                      icon: EditIcon,
                      func: () => handleRedactName(),
                      visible: veMusicStore.currentUser?.name !== userName
                   }"
      />
    </LabelUi>

    <LabelUi text="Логин:">
      <InputUi v-model="userLogin"
               minlength="4"
               :disabled="isLoading"
               :action-btn="{
                      icon: EditIcon,
                      func: () => handleRedactLogin(),
                      visible: veMusicStore.currentUser?.login !== userLogin
                   }"
      />
    </LabelUi>

    <LabelUi text="Пароль:">
      <InputUi v-model="userPassword"
               minlength="4"
               :disabled="isLoading"
               :action-btn="{
                      icon: EditIcon,
                      func: () => handleRedactPassword(),
                      visible: !!userPassword?.length
                   }"
      />
    </LabelUi>
  </form>

</template>