<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>

  <label class="text-w600 text-light-alt cursor-pointer flex flex-column">
    <span class="flex mb-4 text-15">{{ text }}</span>
    <slot/>
  </label>

</template>