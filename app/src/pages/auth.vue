<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";

import {UserWithTokenType} from "@/types/user.ts";

import {apiAuth, apiRegister} from "@api/auth/auth.ts";

import {onBlur, onInput, onSubmit} from "@composables/useFormValidation.ts";
import {showError} from "@utils/modals.ts";
import {login} from "@utils/auth.ts";

import LabelUi from "@ui/LabelUi.vue";
import InputUi from "@ui/InputUi.vue";
import ButtonUi from "@ui/ButtonUi.vue";

const router = useRouter()

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
        form.value.password
    )
    if (response) auth(response)
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
        form.value.name
    )
    if (response) auth(response)
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

  <div class="auth h-screen flex-center">

    <div class="flex flex-column gap-20 w-25">
      <form novalidate
            data-js-form
            class="flex flex-column gap-24"
            @submit="handleSubmit"
      >
        <p class="h3 text-center">{{isAuth ? 'Авторизация' : 'Регистрация'}}</p>

        <div class="flex flex-column gap-24" v-auto-animate>
          <LabelUi text="Логин" class="position-relative">
            <InputUi v-model="form.login"
                     :disabled="isLoading"
                     id="login"
                     minlength="4"
                     maxlength="20"
                     @input="onInput"
                     @blur="onBlur"
                     required
            />
            <span class="text-accent text-14 position-absolute top-100"
                  data-js-error-for-login
            />
          </LabelUi>

          <LabelUi text="Пароль" class="position-relative">
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
            <span class="text-accent text-14 position-absolute top-100"
                  data-js-error-for-password
            />
          </LabelUi>

          <LabelUi v-if="!isAuth"
                   text="Имя пользователя"
                   class="position-relative"
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
            <span class="text-accent text-14 position-absolute top-100"
                  data-js-error-for-name
            />
          </LabelUi>
        </div>

        <ButtonUi :is-loading="isLoading" type="submit">
          {{isAuth ? 'Войти' : 'Зарегистрироваться'}}
        </ButtonUi>
      </form>

      <div class="flex-center gap-4 text-14">
        <span>
          {{isAuth ? 'Еще не зарегистрированы?' : 'Уже есть аккаунт?'}}
        </span>
        <button class="text-accent"
                type="button"
                @click="handleIsAuthType"
        >
          {{isAuth ? 'Зарегистрироваться' : 'Авторизоваться'}}
        </button>
      </div>
    </div>
  </div>

</template>