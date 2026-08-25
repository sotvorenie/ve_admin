<script setup lang="ts">
defineProps<{
  modelValue: string | number
}>()

defineEmits<{
  'update:modelValue': [value: string | number]
}>()
</script>

<template>
  <input
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="w-100 text-light p-10 text-16 border border-light-alt rounded-12 transition-colors focus:border-accent placeholder:text-dark-muted bg-transparent"
  />
</template>