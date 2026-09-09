<script setup lang="ts">
import {onBeforeUnmount, onMounted} from "vue";

import ButtonUi from "@ui/ButtonUi.vue";

withDefaults(
    defineProps<{
      closeVisible?: boolean
      closeText?: string
      size?: number
    }>(), {
      closeVisible: false,
      closeText: 'Ок',
      size: 400,
    }
)

const isVisible = defineModel<boolean>({default: false})

const open = () => {
  isVisible.value = true
}

const close = () => {
  isVisible.value = false
}

const handleEsc = (e: KeyboardEvent) => {
  if (e.key === 'Escape') close()
}

onMounted(() => document.addEventListener('keydown', handleEsc))
onBeforeUnmount(() => document.removeEventListener('keydown', handleEsc))
</script>

<template>

  <slot name="activator" :open="open" :close="close"/>

  <Transition name="fade">
    <Teleport to="body">
      <div class="modal z-10000 flex-center position-absolute inset-0" v-if="isVisible" @click="close">
        <div class="bg-dark-alt p-20 rounded-20" :style="{width: `${size / 16}rem`}" @click.stop>
          <slot name="default" :close="close"/>

          <ButtonUi v-if="closeVisible"
                    class="modal__close text-upper"
                    @click="close"
          >
            {{closeText}}
          </ButtonUi>
        </div>
      </div>
    </Teleport>
  </Transition>

</template>