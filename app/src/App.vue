<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
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
</script>

<template v-if="visible">
  <Message/>

  <router-view />
</template>