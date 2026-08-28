<script setup lang="ts">
import {useRouter} from "vue-router";

import {showConfirm} from "@utils/modals.ts";

import ButtonUi from "@ui/ButtonUi.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();

defineProps<{
  isLoading: boolean
}>()

const router = useRouter()

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
</script>

<template>

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

</template>