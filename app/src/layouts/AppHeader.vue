<script setup lang="ts">
import {computed, watchEffect} from "vue";

import {useRoute, useRouter} from "vue-router";

import SelectArrowIcon from "@icons/SelectArrowIcon.vue";

import usePageStore from "@store/usePageStore.ts";
const pageStore = usePageStore();

const router = useRouter()
const route = useRoute()

const visibleBack = computed(() => route.path !== '/')

const handleBack = () => {
  if (!visibleBack.value) return

  router.back()
}

watchEffect(() => pageStore.pageTitle = route.meta.title as string)
</script>

<template>

  <header class="header flex align-center gap-20">
    <button v-if="visibleBack"
            class="header__btn rounded-10 button-width-svg border flex-center"
            type="button"
            @click="handleBack"
    >
      <SelectArrowIcon/>
    </button>

    <span class="text-w600 h5">{{pageStore.pageTitle}}</span>
  </header>

</template>