<script setup lang="ts">
import {onMounted, ref} from "vue";

import {checkMe} from "@utils/auth.ts";
import AppLayout from "@layouts/AppLayout.vue";

const visible = ref(false)

onMounted(async () => {
  await checkMe()

  visible.value = true
})
</script>

<template>

  <Transition name="fade">
    <AppLayout v-if="visible"/>
  </Transition>

</template>