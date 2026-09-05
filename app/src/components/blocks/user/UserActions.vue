<script setup lang="ts">
import {useRouter} from "vue-router";

import {showConfirm} from "@utils/modals.ts";
import {logout} from "@utils/auth.ts";

import ButtonUi from "@ui/ButtonUi.vue";

defineProps<{
  isLoading: boolean
}>()

const router = useRouter()

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

  <div class="flex flex-column gap-10 mt-auto">
    <ButtonUi :disabled="isLoading"
              @click="handleLogout"
    >
      Выйти
    </ButtonUi>

    <ButtonUi :disabled="isLoading"
              @click="router.back"
    >
      Отмена
    </ButtonUi>
  </div>

</template>