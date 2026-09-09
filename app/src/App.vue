<script setup lang="ts">
import {onBeforeMount, ref, watch} from "vue";
import {useRouter} from "vue-router";

import { checkMe } from "@utils/auth.ts";

import Message from "@ui/Message.vue";

import useUserStore from "@store/useUserStore.ts";
const userStore = useUserStore();

const router = useRouter()

const visible = ref(false)

onBeforeMount(async () => {
  await checkMe()
  if (!userStore.isLogged) await router.replace('/auth')
  visible.value = true
})

watch(
    () => userStore.isLogged,
    (isLogged: boolean) => {
      if (!isLogged) router.replace('/auth')
    }
)
</script>

<template v-if="visible">
  <Message/>

  <router-view />
</template>