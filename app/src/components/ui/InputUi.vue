<script setup lang="ts">
import {computed, ref} from "vue";

const props = withDefaults(
    defineProps<{
      disabled?: boolean
      modelValue: string | number
      actionBtn?: {icon: any, func: Function, visible: boolean}
    }>(), {
      disabled: true,
    }
)

defineEmits<{
  'update:modelValue': [value: string | number]
}>()

defineOptions({
  inheritAttrs: false
})

const inputRef = ref<HTMLInputElement | null>(null)

const visibleActionBtn = computed(() => {
  return props.actionBtn?.visible && inputRef.value?.checkValidity() && !props.disabled
})
</script>

<template>
  <div class="relative">
    <input
        v-bind="$attrs"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        class="w-full p-2.5 border border-white/90 rounded-[0.8rem] transition-colors outline-0"
        :class="[
          actionBtn?.visible && 'pr-12.5',
        ]"
        :disabled="disabled"
        ref="inputRef"
    />

    <Transition name="fade">
      <button v-if="actionBtn && visibleActionBtn"
              class="recolor-svg w-7.5 aspect-square absolute -translate-y-1/2 top-1/2 right-2 rounded-full flex items-center justify-center cursor-pointer hover:text-accent transition-colors"
              type="button"
              @click="actionBtn.func()"
      >
        <Component v-if="actionBtn?.icon"
                   :is="actionBtn.icon"
                   class="w-5 h-auto aspect-square"
        />
      </button>
    </Transition>
  </div>
</template>