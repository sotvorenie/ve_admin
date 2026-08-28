<script setup lang="ts">
import {computed, onBeforeMount, ref, watchEffect} from "vue";
import {useRoute, useRouter} from "vue-router";

import {AppUserType} from "@/types/user.ts";

import {getUser} from "@api/users/veMusic.ts";

import {useSignal} from "@composables/useSignal.ts";
import {showConfirm, showError} from "@utils/modals.ts";

import LabelUi from "@ui/LabelUi.vue";
import InputUi from "@ui/InputUi.vue";
import ImgUpload from "@ui/ImgUpload.vue";
import ButtonUi from "@ui/ButtonUi.vue";

import EditIcon from "@icons/EditIcon.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();
import usePageStore from "@store/usePageStore.ts";
const pageStore = usePageStore();

const signal = useSignal()

const route = useRoute()
const router = useRouter()

const userId = computed(() => route.params.id)

const userName = ref<string>(veMusicStore.currentUser?.name ?? '')
const userLogin = ref<string>(veMusicStore.currentUser?.login ?? '')
const userPassword = ref<string>(veMusicStore.currentUser?.password ?? '')

const isLoading = ref<boolean>(true)

const handleRedactName = async () => {
  if (veMusicStore.currentUser?.name === userName.value) return

  const confirm = await showConfirm(
      'Редактирование данных пользователя',
      'Вы действительно хотите редактировать имя пользователя?'
  )
  if (confirm) {

  }
}

const handleRedactLogin = async () => {
  if (veMusicStore.currentUser?.login === userLogin.value) return

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

const handleRedactAvatar = (file: File) => {
  console.log(file.name)
}

const handleDelete = async () => {
  const confirm = await showConfirm(
      'Удаление пользователя',
      'Вы действительно хотите удалить пользователя?'
  )

  if (confirm) {

  }
}

const handleCancel = () => {
  veMusicStore.currentUser = null
  router.back()
}

const handleDeleteAvatar = async () => {
  const confirm = await showConfirm(
      'Удаление фото',
      'Вы действительно хотите удалить аватарку пользователя?'
  )

  if (confirm) {

  }
}

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

onBeforeMount(() => {
  getCurrentUser()
})

watchEffect(() => {
  pageStore.pageTitle = `Пользователь veMusic: (${veMusicStore.currentUser?.id}) "${veMusicStore.currentUser?.name}"`
})
</script>

<template>

  <div class="user h-100 flex-center">
    <div class="flex gap-20">
      <div class="user__avatar">
        <ImgUpload :img-url="veMusicStore.currentUser?.avatarUrl"
                   @select="(file: File) => handleRedactAvatar(file)"
                   @delete="handleDeleteAvatar"
        />
      </div>

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

        <div class="flex flex-column gap-10 mt-auto">
          <ButtonUi :disabled="isLoading"
                    @click="handleDelete"
          >
            Удалить пользователя
          </ButtonUi>
          <ButtonUi :disabled="isLoading"
                    @click="handleCancel"
          >
            Отмена
          </ButtonUi>
        </div>
      </form>
    </div>
  </div>

</template>