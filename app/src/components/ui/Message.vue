<script setup lang="ts">
import Icon from "@ui/Icon.vue";

import CrossIcon from "@icons/CrossIcon.vue";

import useMessageStore from "@store/useMessageStore.ts";
const messageStore = useMessageStore();
</script>

<template>
  <Transition name="message-slide">
    <div
        v-if="messageStore.isVisible"
        class="message position-fixed left-0 right-0 z-1000 px-16 flex justify-center pointer-none text-dark-muted"
    >
      <div class="message__content px-16 py-12 flex align-center gap-12 pointer-auto bg-light rounded-20">
        <span class="text-ellipsis flex-1 text-13 text-w700">{{ messageStore.message }}</span>

        <button
            type="button"
            @click="messageStore.hide"
            class="transition-colors cursor-pointer flex-shrink-0 flex align-center justify-center"
            title="Закрыть"
        >
          <Icon :name="CrossIcon" :size="16" />
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.message-slide-enter-active,
.message-slide-leave-active {
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.message-slide-enter-from,
.message-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>