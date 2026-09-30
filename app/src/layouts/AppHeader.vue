<script setup lang="ts">
import {computed, watchEffect} from "vue";
import {useRoute, useRouter} from "vue-router";

import Icon from "@ui/Icon.vue";

import SelectArrowIcon from "@icons/SelectArrowIcon.vue";

import usePageStore from "@store/usePageStore.ts";
const pageStore = usePageStore();

const router = useRouter()
const route = useRoute()

const visibleBack = computed(() => route.path !== '/')

const handleBack = () => {
  if (visibleBack.value) router.back()
}

watchEffect(() => pageStore.pageTitle = route.meta.title as string)
</script>

<template>

  <header class="flex items-center gap-[1rem]">
    <button v-if="visibleBack"
            class="w-10 aspect-square rotate-90 rounded-xl border flex items-center justify-center recolor-svg cursor-pointer hover:text-accent transition-colors"
            type="button"
            aria-label="Назад"
            title="Назад"
            @click="handleBack"
    >
      <Icon :name="SelectArrowIcon" :size="22"/>
    </button>

    <span class="font-semibold text-xl">{{pageStore.pageTitle}}</span>
  </header>

</template>