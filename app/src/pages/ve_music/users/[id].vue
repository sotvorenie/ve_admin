<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

import {showConfirm} from "@utils/modals.ts";

import LabelUi from "@ui/LabelUi.vue";
import InputUi from "@ui/InputUi.vue";
import ImgUpload from "@ui/ImgUpload.vue";
import ButtonUi from "@ui/ButtonUi.vue";

import EditIcon from "@icons/EditIcon.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();
import usePageStore from "@store/usePageStore.ts";
const pageStore = usePageStore();

const route = useRoute()
const router = useRouter()

const userId = computed(() => route.params.id)

const userName = ref<string>(veMusicStore.currentUser?.name ?? '')
const userPassword = ref<string>(veMusicStore.currentUser?.password ?? '')

const handleRedactName = () => {
  if (veMusicStore.currentUser?.name === userName.value) return
}

const handleRedactPassword = () => {
  if (veMusicStore.currentUser?.password === userPassword.value) return
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

onMounted(() => {
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

      <form novalidate class="user__form flex flex-column gap-20">
        <p class="h4 text-w600">Данные пользователя</p>

        <LabelUi text="Имя:">
          <InputUi v-model="userName"
                   minlength="4"
                   :action-btn="{
                      icon: EditIcon,
                      func: () => handleRedactName,
                      visible: veMusicStore.currentUser?.name !== userName
                   }"
          />
        </LabelUi>

        <LabelUi text="Пароль:">
          <InputUi v-model="userPassword"
                   minlength="4"
                   :action-btn="{
                      icon: EditIcon,
                      func: () => handleRedactPassword,
                      visible: !!userPassword?.length
                   }"
          />
        </LabelUi>

        <div class="flex flex-column gap-10 mt-auto">
          <ButtonUi @click="handleDelete">
            Удалить пользователя
          </ButtonUi>
          <ButtonUi @click="handleCancel">
            Отмена
          </ButtonUi>
        </div>
      </form>
    </div>
  </div>

</template>