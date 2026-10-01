<script setup lang="ts">
import {onBeforeUnmount, onMounted} from "vue";

import ButtonUi from "@ui/ButtonUi.vue";
import Icon from "@ui/Icon.vue";

import CrossIcon from "@icons/CrossIcon.vue";

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
      <div class="z-10000 flex items-center justify-center absolute bg-black/50 backdrop-blur-xs inset-0" v-if="isVisible" @click="close">
        <div class="bg-text-alt p-5 rounded-xl relative" :style="{width: `${size / 16}rem`}" @click.stop>
          <div class="w-full h-full max-h-[70vh] overflow-y-auto overflow-x-hidden scrollbar-thin">
            <slot name="default" :close="close"/>
          </div>

          <ButtonUi class="!absolute !rounded-full -top-4 -right-4 bg-text-alt"
                    aria-label="Закрыть"
                    title="Закрыть"
                    @click="close"
          >
            <Icon :name="CrossIcon"
                  :size="18"
            />
          </ButtonUi>

          <ButtonUi v-if="closeVisible"
                    class="uppercase"
                    @click="close"
          >
            {{closeText}}
          </ButtonUi>
        </div>
      </div>
    </Teleport>
  </Transition>

</template>