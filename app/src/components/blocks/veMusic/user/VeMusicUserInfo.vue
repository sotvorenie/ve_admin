<script setup lang="ts">
import {UserRole} from "@/types/user.ts";

import {apiRedactUserLogin, apiRedactUserName, apiRedactUserPassword, apiUpdateUserRole} from "@api/veMusic/user.ts";

import {showConfirm, showError} from "@utils/modals.ts";

import {VeMusicUserForm} from "@components/veMusic/user/VeMusicUserData.vue";

import LabelUi from "@ui/LabelUi.vue";
import InputUi from "@ui/InputUi.vue";
import SelectUi, {Option} from "@ui/SelectUi.vue";

import EditIcon from "@icons/EditIcon.vue";

import useVeMusicStore from "@store/useVeMusicStore.ts";
const veMusicStore = useVeMusicStore();


const props = defineProps<{
  signal: AbortSignal
}>()

const form = defineModel<VeMusicUserForm>('form', {required: true})
const isLoading = defineModel<boolean>('isLoading', {default: true})

const rolesOptions: Option[] = [
  {
    id: UserRole.USER,
    label: UserRole.USER,
  },
  {
    id: UserRole.ADMIN,
    label: UserRole.ADMIN,
  }
]

const confirmTitle = 'Редактирование данных пользователя'
const errorTitle = 'Ошибка редактирования пользователя'

const handleRedactName = async () => {
  if (form.value.name === veMusicStore.currentUser?.name) return

  const confirm = await showConfirm(
      confirmTitle,
      'Вы действительно хотите редактировать имя пользователя?'
  )
  if (confirm) await redactName()
}

const redactName = async () => {
  try {
    isLoading.value = true

    await apiRedactUserName(veMusicStore.currentUser!.id, form.value.name, props.signal)
    veMusicStore.currentUser!.name = form.value.name
  } catch (err: any) {
    await showError(
        confirmTitle,
        `Не удалось редактировать имя пользователя.. Ошибка: ${err?.detail}`
    )
  } finally {
    isLoading.value = false
  }
}

const handleRedactLogin = async () => {
  if (form.value.login === veMusicStore.currentUser?.login) return

  const confirm = await showConfirm(
      confirmTitle,
      'Вы действительно хотите редактировать логин пользователя?'
  )
  if (confirm) await redactLogin()
}

const redactLogin = async () => {
  try {
    isLoading.value = true

    await apiRedactUserLogin(veMusicStore.currentUser!.id, form.value.login, props.signal)
    veMusicStore.currentUser!.login = form.value.login
  } catch (err: any) {
    await showError(
        errorTitle,
        err?.detail
    )
  } finally {
    isLoading.value = false
  }
}

const handleRedactPassword = async () => {
  const confirm = await showConfirm(
      confirmTitle,
      'Вы действительно хотите редактировать пароль пользователя?'
  )
  if (confirm) await redactPassword()
}

const redactPassword = async () => {
  try {
    isLoading.value = true

    await apiRedactUserPassword(veMusicStore.currentUser!.id, form.value.password, props.signal)
    form.value.password = ''
  } catch (err: any) {
    await showError(
        errorTitle,
        err?.detail
    )
  } finally {
    isLoading.value = false
  }
}

const handleUpdateRole = async (userRole: UserRole) => {
  const confirm = await showConfirm(
      confirmTitle,
      'Вы действительно хотите редактировать роль пользователя?'
  )
  if (confirm) await updateRole(userRole)
}

const updateRole = async (newRole: UserRole) => {
  try {
    isLoading.value = true

    await apiUpdateUserRole(veMusicStore.currentUser!.id, newRole, props.signal)
    form.value.role = newRole
  } catch (err: any) {
    await showError(
        errorTitle,
        err?.detail
    )
  } finally {
    isLoading.value = false
  }
}
</script>

<template>

  <form novalidate class="flex flex-col gap-2.5">
    <LabelUi text="Имя:">
      <InputUi v-model="form.name"
               minlength="4"
               maxlength="20"
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
               maxlength="20"
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
               maxlength="20"
               :disabled="isLoading"
               :action-btn="{
                      icon: EditIcon,
                      func: () => handleRedactPassword(),
                      visible: form.password?.length >= 4
                   }"
      />
    </LabelUi>

    <LabelUi text="Роль пользователя:">
      <SelectUi :model-value="form.role"
                :options="rolesOptions"
                @update:model-value="(val) => handleUpdateRole(val as UserRole)"
      />
    </LabelUi>
  </form>

</template>