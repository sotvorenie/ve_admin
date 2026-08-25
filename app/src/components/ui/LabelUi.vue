<script setup lang="ts">
defineProps<{
  forId: string
  text: string
}>()
</script>

<template>

  <label class="text-16 text-w600 text-light-alt cursor-pointer flex flex-column"
         :for="forId">
    <span class="flex mb-4">{{ text }}</span>
    <slot/>
  </label>

</template>