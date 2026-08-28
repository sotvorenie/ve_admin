<script setup lang="ts">
import {computed, ref} from "vue";

const props = defineProps<{
  modelValue: string | number
  actionBtn?: {icon: any, func: Function, visible: boolean}
}>()

defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const inputRef = ref<HTMLInputElement | null>(null)

const visibleActionBtn = computed(() => {
  return props.actionBtn?.visible && inputRef.value?.checkValidity()
})
</script>

<template>
  <div class="input position-relative">
    <input
        v-bind="$attrs"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        class="w-100 p-10 text-16 border border-light-alt rounded-12 transition-colors focus:border-accent placeholder:text-dark-muted"
        :class="[
          actionBtn?.visible && 'pr-50',
        ]"
        ref="inputRef"
    />

    <Transition name="fade">
      <button v-if="actionBtn && visibleActionBtn"
              class="input__btn button-width-full-svg absolute-y-center rounded-full flex-center"
              type="button"
              @click="actionBtn.func"
      >
        <Component v-if="actionBtn?.icon" :is="actionBtn.icon"/>
      </button>
    </Transition>
  </div>
</template>