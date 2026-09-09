<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

import Icon from '@ui/Icon.vue'

import SelectArrowIcon from "@icons/SelectArrowIcon.vue";

export interface Option {
  id: string | number
  label: string
}

const props = defineProps<{
  modelValue: string | number
  options: Option[]
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const selectedLabel = computed(() => {
  const found = isSelected()
  if (found) return found.label
  return props.placeholder || props.modelValue
})

const isSelected = () => {
  return props.options.find(opt => opt.id === props.modelValue)
}

const selectOption = (id: string | number) => {
  emit('update:modelValue', id)
  isOpen.value = false
}

const closeDropdown = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => globalThis.addEventListener('click', closeDropdown))
onUnmounted(() => globalThis.removeEventListener('click', closeDropdown))
</script>

<template>
  <div class="position-relative" ref="dropdownRef">
    <button
        @click.stop="isOpen = !isOpen"
        class="flex align-center justify-between w-100 h-100 bg-dark-alt text-w600 gap-12 p-12 md:px-20 md:py-4 text-14 cursor-pointer text-nowrap transition-colors text-left text-light"
        :class="[
          isOpen
            ? 'rounded-t-12 rounded-b-none border-b-0'
            : 'rounded-12'
        ]"
        type="button"
    >
      <span class="text-ellipsis"
            :class="isSelected() ? 'text-light' : 'text-light-alt'"
      >
        {{ selectedLabel }}
      </span>
      <Icon
          :name="SelectArrowIcon"
          :size="20"
          class="flex-shrink-0 text-light-alt"
          :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <div
        v-if="isOpen"
        class="bg-dark-alt p-12 md:px-20 pt-0 md:py-4 flex flex-column rounded-b-12 position-absolute left-0 top-100 w-100 z-10"
    >
      <div class="flex flex-column gap-4 overflow-y-auto">
        <button
            v-for="opt in options"
            :key="opt.id"
            @click="selectOption(opt.id)"
            class="flex align-center w-100 mb-4 last:mb-0 text-light text-14 text-left hover:text-accent"
            :class="modelValue === opt?.id && 'pointer-none text-accent'"
            type="button"
        >
          <span class="text-ellipsis">{{ opt.label }}</span>
        </button>
      </div>
    </div>
  </div>
</template>