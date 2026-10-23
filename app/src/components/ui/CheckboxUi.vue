<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
    defineProps<{
      modelValue: boolean
      disabled?: boolean
      label?: string
      id?: string
    }>(), {
      modelValue: false,
      disabled: false,
    }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const checked = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit('update:modelValue', val),
})

const inputId = computed(() => props.id ?? `checkbox-${Math.random().toString(36).slice(2, 9)}`)
</script>

<template>
  <label
      :for="inputId"
      :class="[
          'inline-flex items-center gap-2 cursor-pointer select-none',
          disabled && 'opacity-50 pointer-events-none'
      ]"
  >
    <span class="relative inline-flex items-center justify-center">
      <input class="peer sr-only"
             v-model="checked"
             :id="inputId"
             :disabled="disabled"
             type="checkbox"
      />
      <span class="flex h-5 w-5 items-center justify-center rounded border border-white bg-transparent transition-colors duration-150 peer-checked:border-accent peer-checked:bg-accent">
        <svg
            v-if="checked"
            class="h-3.5 w-3.5 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
          <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
          />
        </svg>
      </span>
    </span>

    <span v-if="label" class="text-sm">{{ label }}</span>
  </label>
</template>