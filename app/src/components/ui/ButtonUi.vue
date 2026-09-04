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
      class="flex-center position-relative gap-10 text-center text-ellipsis rounded-12 border border-light-alt hover:border-accent hover:text-accent p-10 text-w500"
  >
    <Icon v-show="isLoading"
          :name="LoadingIcon"
          :size="25"
          class="absolute-center"
    />
    <span :style="{
            opacity: isLoading ? 0 : 1,
          }"
    >
      <slot/>
    </span>
  </button>

</template>