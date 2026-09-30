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
  <div class="relative" ref="dropdownRef">
    <button
        @click.stop="isOpen = !isOpen"
        class="recolor-svg flex items-center justify-between w-full h-full bg-text-alt font-semibold gap-3 p-3 text-sm cursor-pointer text-nowrap transition-colors text-left text-white"
        :class="[
          isOpen
            ? 'rounded-t-xl rounded-b-none border-b-0'
            : 'rounded-xl'
        ]"
        type="button"
    >
      <span class="truncate"
            :class="isSelected() ? 'text-accent' : 'text-white'"
      >
        {{ selectedLabel }}
      </span>
      <Icon
          :name="SelectArrowIcon"
          :size="20"
          class="shrink-0"
          :class="isOpen && 'rotate-180'"
      />
    </button>

    <div
        v-if="isOpen"
        class="bg-text-alt p-3 pt-0 flex flex-col rounded-b-xl absolute left-0 top-full w-full z-10 max-h-25 overflow-y-auto"
    >
      <div class="flex flex-col gap-1 overflow-y-auto">
        <button
            v-for="opt in options"
            :key="opt.id"
            @click="selectOption(opt.id)"
            class="flex items-center w-full not-last:mb-1 text-white text-sm text-left hover:text-accent cursor-pointer transition-colors"
            :class="modelValue === opt?.id && 'pointer-events-none text-accent'"
            type="button"
        >
          <span class="truncate">{{ opt.label }}</span>
        </button>
      </div>
    </div>
  </div>
</template>