<script setup lang="ts">
import {computed, ref, watchEffect} from "vue";

import {UserService} from "@api/user/UserService.ts";

import {showConfirm, showError} from "@utils/modals.ts";

import EditIcon from "@icons/EditIcon.vue";
import InputUi from "@ui/InputUi.vue";
import LabelUi from "@ui/LabelUi.vue";

import useUserStore from "@store/useUserStore.ts";
const userStore = useUserStore();

const props = defineProps<{
  signal: AbortSignal
  confirmTitle: string
  errorTitle: string
}>()

const isLoading = defineModel<boolean>('is-loading')

const form = ref<{name: string, password: string}>({
  name: userStore.user.name,
  password: '',
})

const visibleNameEditBtn = computed(() => {
  return form.value.name?.length >= 4 && form.value.name?.trim() !== userStore.user.name
})

const handleUpdateName = async () => {
  const confirm = await showConfirm(
      props.confirmTitle,
      'Вы действительно хотите изменить имя пользователя?'
  )
  if (confirm) await updateName()
}

const updateName = async () => {
  try {
    isLoading.value = true

    await UserService.updateName(form.value.name, props.signal)
    userStore.user.name = form.value.name
  } catch {
    await showError(
        props.errorTitle,
        'Не удалось редактировать имя пользователя'
    )
  } finally {
    isLoading.value = false
  }
}

const handleUpdatePassword = async () => {
  const confirm = await showConfirm(
      props.confirmTitle,
      'Вы действительно хотите изменить пароль пользователя?'
  )
  if (confirm) await updatePassword()
}

const updatePassword = async () => {
  try {
    isLoading.value = true

    await UserService.updatePassword(form.value.password, props.signal)
    form.value.password = ''
  } catch (err: any) {
    await showError(
        props.errorTitle,
        err?.detail ?? 'Не удалось редактировать пароль пользователя'
    )
  } finally {
    isLoading.value = false
  }
}

watchEffect(() => {
  form.value.name = userStore.user.name
})
</script>

<template>

  <form class="flex flex-col gap-[1.2rem]">
    <p class="text-xl font-semibold">Данные пользователя</p>

    <LabelUi text="Имя:">
      <InputUi v-model="form.name"
               :disabled="isLoading"
               :action-btn="{
                      icon: EditIcon,
                      func: () => handleUpdateName(),
                      visible: visibleNameEditBtn
                   }"
               minlength="4"
               maxlength="20"
      />
    </LabelUi>

    <LabelUi text="Пароль:">
      <InputUi v-model="form.password"
               :disabled="isLoading"
               :action-btn="{
                      icon: EditIcon,
                      func: () => handleUpdatePassword(),
                      visible: form.password?.length >= 4
                   }"
               minlength="4"
               maxlength="20"
      />
    </LabelUi>
  </form>

</template>