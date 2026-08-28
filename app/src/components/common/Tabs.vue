<script setup lang="ts">
import {useRouter} from "vue-router";

import {TabType} from "@/types/tab.ts";

defineProps<{
  items: TabType[]
}>()

const activeTab = defineModel<TabType | null>({
  required: true,
})

const router = useRouter()

const handleTab = (tab: TabType) => {
  activeTab.value = tab
  router.push(tab.url)
}
</script>

<template>

  <ul class="flex">
    <li class="border-r rounded-6"
        v-for="tab in items"
        :key="tab.key"
    >
      <button class="py-6 px-10 text-w500 hover:text-accent"
              :class="[
                $route.path.includes(tab.url) && 'text-accent pointer-none'
              ]"
              type="button"
              @click="handleTab(tab)"
      >
        {{tab.label}}
      </button>
    </li>
  </ul>

</template>