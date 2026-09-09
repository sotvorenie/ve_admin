<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";

import {apiRegister} from "@api/veMusic/auth.ts";

import {useSignal} from "@composables/useSignal.ts";
import {showConfirm, showError} from "@utils/modals.ts";

import InputUi from "@ui/InputUi.vue";
import LabelUi from "@ui/LabelUi.vue";
import ButtonUi from "@ui/ButtonUi.vue";

import CrossIcon from "@icons/CrossIcon.vue";

const router = useRouter()
const signal = useSignal()

const form = ref({
  name: "",
  login: "",
  password: "",
})

const isLoading = ref(false)

const handleCreateUser = async () => {
  const confirm = await showConfirm(
      'Создание пользователя',
      'Вы действительно хотите создать пользователя?'
  )

  if (confirm) await createUser()
}

const createUser = async () => {
  try {
    isLoading.value = true

    await apiRegister(
        form.value.login,
        form.value.password,
        form.value.name,
        signal
    )
    await router.replace('/ve_music/users')
  } catch (err: any) {
    await showError('Ошибка создания жанра', err.detail)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>

  <div class="h-100 flex-center">
    <div class="w-25 flex flex-column gap-20">
      <form novalidate class="flex flex-column gap-10 w-100">
        <LabelUi text="Логин:">
          <InputUi v-model="form.login"
                   :disabled="isLoading"
                   minlength="4"
                   maxlength="20"
                   :action-btn="{
                      icon: CrossIcon,
                      func: () => form.login = '',
                      visible: !!form.login?.length
                   }"
          />
        </LabelUi>

        <LabelUi text="Пароль:">
          <InputUi v-model="form.password"
                   :disabled="isLoading"
                   minlength="4"
                   maxlength="20"
                   :action-btn="{
                      icon: CrossIcon,
                      func: () => form.password = '',
                      visible: !!form.password?.length
                   }"
          />
        </LabelUi>

        <LabelUi text="Имя:">
          <InputUi v-model="form.name"
                   :disabled="isLoading"
                   minlength="4"
                   maxlength="20"
                   :action-btn="{
                      icon: CrossIcon,
                      func: () => form.name = '',
                      visible: !!form.name?.length
                   }"
          />
        </LabelUi>
      </form>

      <div class="flex gap-10 w-50 w-100">
        <ButtonUi :disabled="isLoading"
                  @click="router.replace('/ve_music/users')"
        >
          Отмена
        </ButtonUi>

        <ButtonUi :disabled="isLoading"
                  @click="handleCreateUser"
        >
          Добавить
        </ButtonUi>
      </div>
    </div>
  </div>

</template>