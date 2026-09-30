<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>

  <label class="font-semibold text-white/90 cursor-pointer flex flex-col">
    <span class="flex mb-1">{{ text }}</span>
    <slot/>
  </label>

</template>