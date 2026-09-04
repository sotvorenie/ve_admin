<script setup lang="ts">
import type {Component} from "vue";

defineProps<{
  name: Component
  size: number
}>()
</script>

<template>

  <Component :is="name" :style="{
    width: size / 16 + 'rem',
    height: size / 16 + 'rem',
  }"/>

</template>