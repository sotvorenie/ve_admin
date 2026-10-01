<script setup lang="ts">
import {ref} from "vue";
import {onBeforeRouteUpdate} from "vue-router";

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

onBeforeRouteUpdate(() => {
  pageStore.createBtnInfo = {
    label: '',
    to: '',
  }
})
</script>

<template>

  <div class="h-full overflow-hidden flex flex-col">
    <div class="flex justify-between gap-4 pb-2">
      <Tabs :items="tabsList" v-model="activeTab"/>

      <div :class="`flex items-center flex-1 gap-3 justify-end`">
        <template v-if="searchStore.searchActive">
          <LabelUi text="" class="w-full max-w-100">
            <InputUi v-model="searchStore.searchName"
                     :disabled="false"
                     placeholder="Поиск.."
                     @keydown.enter="searchStore.searchFunc"
            />
          </LabelUi>

          <ButtonUi class="recolor-svg flex items-center justify-center rounded-full w-fit cursor-pointer"
                    title="Поиск"
                    @click="searchStore.searchFunc()"
          >
            <Icon :name="SearchIcon" :size="20"/>
          </ButtonUi>

          <ButtonUi class="recolor-svg flex items-center justify-center rounded-full w-fit cursor-pointer"
                    title="Закрыть"
                    @click="searchStore.searchActive = false"
          >
            <Icon :name="CrossIcon" :size="20"/>
          </ButtonUi>
        </template>

        <template v-else>
          <ButtonUi v-if="!unSearchablePages.includes($route.path)"
                    class="recolor-svg flex items-center justify-center w-fit cursor-pointer"
                    @click="searchStore.searchActive = true"
          >
            <Icon :name="SearchIcon" :size="22"/>
          </ButtonUi>

          <RouterLink v-if="pageStore.createBtnInfo?.to"
                      :to="pageStore.createBtnInfo.to"
          >
            <ButtonUi class="cursor-pointer">
              {{pageStore.createBtnInfo.label}}
            </ButtonUi>
          </RouterLink>
        </template>
      </div>
    </div>

    <router-view/>
  </div>

</template>