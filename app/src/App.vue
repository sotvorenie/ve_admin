<script setup lang="ts">
import {onBeforeMount, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";

import { checkMe } from "@utils/auth.ts";

import Message from "@ui/Message.vue";

import useUserStore from "@store/useUserStore.ts";
const userStore = useUserStore();
import useApiUrlStore from "@store/useApiUrlStore.ts";
const apiUrlStore = useApiUrlStore();

const router = useRouter()
const route = useRoute()

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

watch(
    () => route.path,
    (path) => {
      if (path === '/user') apiUrlStore.setUrl(apiUrlStore.allUrls.admin)
      if (path.includes('ve_music')) apiUrlStore.setUrl(apiUrlStore.allUrls.veMusic)
    }
)
</script>

<template v-if="visible">
  <Message/>

  <router-view />
</template>