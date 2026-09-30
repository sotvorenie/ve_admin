<script setup lang="ts">
import Icon from "@ui/Icon.vue";

import LoadingIcon from "@icons/LoadingIcon.vue";

withDefaults(
    defineProps<{
      type?: 'button' | 'submit' | 'reset',
      isLoading?: boolean,
      disabled?: boolean,
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
      class="recolor-svg 2xl:text-lg flex items-center justify-center relative gap-2.5 text-center truncate rounded-xl border border-white hover:border-accent transition-all hover:text-accent p-2.5 2xl:p-3 font-medium cursor-pointer"
  >
    <Icon v-show="isLoading"
          :name="LoadingIcon"
          :size="25"
          class="absolute -translate-1/2 top-1/2 left-1/2"
    />
    <span class="flex flex-col"
          :style="{
            opacity: isLoading ? 0 : 1,
          }"
    >
      <slot/>
    </span>
  </button>

</template>