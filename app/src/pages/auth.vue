<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";

import {UserWithTokenType} from "@/types/user.ts";

import {apiAuth, apiRegister} from "@api/auth/auth.ts";

import {onBlur, onInput, onSubmit} from "@composables/useFormValidation.ts";
import {useSignal} from "@composables/useSignal.ts";
import {showError} from "@utils/modals.ts";
import {login} from "@utils/auth.ts";

import LabelUi from "@ui/LabelUi.vue";
import InputUi from "@ui/InputUi.vue";
import ButtonUi from "@ui/ButtonUi.vue";

import useMessageStore from "@store/useMessageStore.ts";
const messageStore = useMessageStore();

const router = useRouter()
const signal = useSignal()

const isAuth = ref<boolean>(true)

const isLoading = ref<boolean>(false)

const form = ref<{login: string, password: string, name: string}>({
  login: '',
  password: '',
  name: '',
})

const auth = (response: UserWithTokenType) => {
  login(response)
  router.replace('/')
}

const handleSubmit = (event: Event) => {
  const check: boolean = onSubmit(event)

  if (check) isAuth.value ? logIn() : register()
}

const logIn = async () => {
  try {
    isLoading.value = true

    const response: UserWithTokenType = await apiAuth(
        form.value.login,
        form.value.password,
        signal
    )
    if (response) auth(response)
    messageStore.show(`Добро пожаловать, ${response?.user?.name}!!`)
  } catch (err: any) {
    await showError('Ошибка авторизация', err.detail)
  } finally {
    isLoading.value = false
  }
}

const register = async () => {
  try {
    isLoading.value = true

    const response: UserWithTokenType = await apiRegister(
        form.value.login,
        form.value.password,
        form.value.name,
        signal
    )
    if (response) auth(response)
    messageStore.show(`Добро пожаловать, ${form.value.name.trim()}!!`)
  } catch (err: any) {
    await showError('Ошибка регистрации', err.detail)
  } finally {
    isLoading.value = false
  }
}

const clear = () => {
  form.value = {
    login: '',
    password: '',
    name: '',
  }
}

const handleIsAuthType = () => {
  clear()
  isAuth.value = !isAuth.value
}
</script>

<template>

  <div class="h-screen flex items-center justify-center">

    <div class="max-w-[500px] flex flex-col gap-5 w-1/4">
      <form novalidate
            data-js-form
            class="flex flex-col gap-8"
            @submit="handleSubmit"
      >
        <p class="text-2xl text-center leading-1">{{isAuth ? 'Авторизация' : 'Регистрация'}}</p>

        <div class="flex flex-col gap-6" v-auto-animate>
          <LabelUi text="Логин" class="relative">
            <InputUi v-model="form.login"
                     :disabled="isLoading"
                     id="login"
                     minlength="4"
                     maxlength="20"
                     @input="onInput"
                     @blur="onBlur"
                     required
            />
            <span class="text-accent text-sm absolute top-full"
                  data-js-error-for-login
            />
          </LabelUi>

          <LabelUi text="Пароль" class="relative">
            <InputUi v-model="form.password"
                     :disabled="isLoading"
                     id="password"
                     type="password"
                     minlength="4"
                     maxlength="20"
                     @input="onInput"
                     @blur="onBlur"
                     required
            />
            <span class="text-accent text-sm absolute top-full"
                  data-js-error-for-password
            />
          </LabelUi>

          <LabelUi v-if="!isAuth"
                   text="Имя пользователя"
                   class="relative"
          >
            <InputUi v-model="form.name"
                     :disabled="isLoading"
                     id="name"
                     minlength="4"
                     maxlength="20"
                     @input="onInput"
                     @blur="onBlur"
                     :required="!isAuth"

            />
            <span class="text-accent text-sm absolute top-25"
                  data-js-error-for-name
            />
          </LabelUi>
        </div>

        <ButtonUi :is-loading="isLoading"
                  type="submit"
        >
          {{isAuth ? 'Войти' : 'Зарегистрироваться'}}
        </ButtonUi>
      </form>

      <div class="flex items-center justify-center gap-1 text-sm">
        <span>
          {{isAuth ? 'Еще не зарегистрированы?' : 'Уже есть аккаунт?'}}
        </span>
        <button class="text-accent cursor-pointer"
                type="button"
                @click="handleIsAuthType"
        >
          {{isAuth ? 'Зарегистрироваться' : 'Авторизоваться'}}
        </button>
      </div>
    </div>
  </div>

</template>