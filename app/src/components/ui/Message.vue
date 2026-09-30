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
        class="fixed left-0 right-0 z-1000 px-4 flex justify-center pointer-events-none text-black/80"
    >
      <div class="px-4 py-3 flex items-center gap-3 absolute -translate-x-1/2 left-1/2 top-3 pointer-events-auto bg-white rounded-xl">
        <span class="truncate flex-1 text-sm font-bold ">{{ messageStore.message }}</span>

        <button
            type="button"
            @click="messageStore.hide"
            class="transition-colors cursor-pointer shrink-0 flex items-center justify-center"
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