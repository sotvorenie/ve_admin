<script setup lang="ts">
import {ref} from "vue";
import {onBeforeRouteLeave, onBeforeRouteUpdate} from "vue-router";

import {TabType} from "@/types/tab.ts";

import Tabs from "@/components/common/Tabs.vue";

import ButtonUi from "@ui/ButtonUi.vue";
import Icon from "@ui/Icon.vue";
import InputUi from "@ui/InputUi.vue";
import LabelUi from "@ui/LabelUi.vue";

import SearchIcon from "@icons/SearchIcon.vue";
import CrossIcon from "@icons/CrossIcon.vue";

import usePageStore from "@store/usePageStore.ts";
const pageStore = usePageStore();
import useSearchStore from "@store/useSearchStore.ts";
const searchStore = useSearchStore();

withDefaults(
    defineProps<{
      tabsList: TabType[]
    }>(), {
      tabsList: () => [],
    }
)

const activeTab = ref<TabType | null>(null)

const unSearchablePages = ['/ve_music', '/ve_music/genres']

const handleEnter = (e: KeyboardEvent) => {
  if (e.key === "Enter") searchStore.searchFunc()
}

onBeforeRouteUpdate(() => {
  pageStore.createBtnInfo = {
    label: '',
    to: '',
  }

  window.addEventListener('keydown', handleEnter)
})

onBeforeRouteLeave(() => {
  window.removeEventListener('keydown', handleEnter)
})
</script>

<template>

  <div class="app-page ve-music h-100 overflow-hidden">
    <div class="flex justify-between gap-20 pb-6">
      <Tabs :items="tabsList" v-model="activeTab"/>

      <div :class="`flex align-center flex-1 gap-10 justify-end`">
        <template v-if="searchStore.searchActive">
          <LabelUi text="" class="w-100" style="max-width: 400px">
            <InputUi v-model="searchStore.searchName"
                     :disabled="false"
                     placeholder="Поиск.."
            />
          </LabelUi>

          <ButtonUi class="flex-center rounded-full w-fit"
                    title="Поиск"
                    @click="searchStore.searchFunc()"
          >
            <Icon :name="SearchIcon" :size="20"/>
          </ButtonUi>

          <ButtonUi class="flex-center rounded-full w-fit"
                    title="Закрыть"
                    @click="searchStore.searchActive = false"
          >
            <Icon :name="CrossIcon" :size="20"/>
          </ButtonUi>
        </template>

        <template v-else>
          <ButtonUi v-if="!unSearchablePages.includes($route.path)"
                    class="flex-center w-fit"
                    @click="searchStore.searchActive = true"
          >
            <Icon :name="SearchIcon" :size="22"/>
          </ButtonUi>

          <RouterLink v-if="pageStore.createBtnInfo?.to"
                      :to="pageStore.createBtnInfo.to"
          >
            <ButtonUi>{{pageStore.createBtnInfo.label}}</ButtonUi>
          </RouterLink>
        </template>
      </div>
    </div>

    <router-view/>
  </div>

</template>