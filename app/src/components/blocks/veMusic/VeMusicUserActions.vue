<script setup lang="ts">
import {useRouter} from "vue-router";

import {showConfirm, showError} from "@utils/modals.ts";

import ButtonUi from "@ui/ButtonUi.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
import {apiDeleteUser} from "@api/veMusic/user.ts";
const veMusicStore = useVeMusicStore();

const props = defineProps<{
  isLoading: boolean
  userId: number
}>()

const router = useRouter()

const isLoading = defineModel<boolean>('isLoading', {default: true})

const handleDelete = async () => {
  const confirm = await showConfirm(
      'Удаление пользователя',
      'Вы действительно хотите удалить пользователя?'
  )

  if (confirm) await deleteUser()
}

const deleteUser = async () => {
  try {
    isLoading.value = true

    await apiDeleteUser(props.userId)
    await router.replace('/ve_music/users')
  } catch (err: any) {
    await showError(
        'Ошибка удаления пользователя',
        `Не удалось удалить пользователя.. Ошибка: ${err?.detail}`
    )
  } finally {
    isLoading.value = false
  }
}

const handleCancel = () => {
  veMusicStore.currentUser = null
  router.back()
}
</script>

<template>

  <div class="flex flex-column gap-10">
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

</template>