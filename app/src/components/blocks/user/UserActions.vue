<script setup lang="ts">
import {showConfirm} from "@utils/modals.ts";
import {logOut} from "@utils/auth.ts";

import ButtonUi from "@ui/ButtonUi.vue";

defineProps<{
  isLoading: boolean
}>()

const handleLogOut = async () => {
  const confirm = await showConfirm(
      'Выход из профиля',
      'Вы действительно хотите выйти?'
  )
  if (confirm) logOut()
}
</script>

<template>

  <div class="flex flex-col gap-2.5 mt-auto">
    <ButtonUi :disabled="isLoading"
              @click="handleLogOut"
    >
      Выйти
    </ButtonUi>

    <ButtonUi :disabled="isLoading"
              @click="$router.back"
    >
      Отмена
    </ButtonUi>
  </div>

</template>