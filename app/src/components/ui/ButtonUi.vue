<script setup lang="ts">
import LoadingIcon from "@icons/LoadingIcon.vue";

withDefaults(
    defineProps<{
      type: string,
      isLoading: boolean,
      disabled: boolean,
    }>(),
    {
      type: 'button',
      isLoading: false,
      disabled: false,
    }
)
</script>

<template>

  <button
      :type="type"
      :disabled="disabled || isLoading"
      class="flex-center gap-10 text-center text-ellipsis rounded-12 border border-light-alt hover:border-accent hover:text-accent p-10 text-w500"
  >
    <LoadingIcon v-if="isLoading"/>
    <slot v-else/>
  </button>

</template>