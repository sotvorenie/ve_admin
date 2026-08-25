<script setup lang="ts">
import {onMounted, ref} from "vue";

import {checkMe} from "@utils/auth.ts";

const visible = ref(false)

onMounted(async () => {
  await checkMe()

  visible.value = true
})
</script>

<template>

  <Transition name="fade">
    <router-view v-if="visible"/>
  </Transition>

</template>