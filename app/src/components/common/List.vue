<script setup lang="ts">
import {computed} from "vue";
import { Fancybox } from "@fancyapps/ui"

import {ListHeadType, ListItemType} from "@/types/list.ts";

const props = defineProps<{
  headItems: ListHeadType[]
  items: ListItemType[]
  colsStyle?: string
}>()

const openFancybox = (src: string) => {
  Fancybox.show([
    {
      src,
      type: 'image',
    }
  ])
}

const colsClass = computed(() => props.colsStyle ? 'd-grid' : `grid-cols-${props.headItems.length}`)
const colsStyles = computed(() => props.colsStyle && `grid-template-columns: ${props.colsStyle}`)
</script>

<template>

  <div class="list">
    <ul class="border-b border-t"
        :class="colsClass"
        :style="colsStyles"
    >
      <li v-for="headItem in headItems"
          :key="headItem.label"
          class="text-center first:border-l border-r p-10"
      >
        {{headItem.label}}
      </li>
    </ul>

    <ul class="flex flex-column">
      <li v-for="(row, rowIndex) in items"
          :key="rowIndex"
      >
        <div
            class="border-b border-light text-center hover:bg-dark-alt"
            :class="colsClass"
            :style="colsStyles"
            @click="$router.push(row.url)"
        >
          <div v-for="(item, index) in row.items"
               :key="index"
               class="flex-center first:border-l border-r p-8"
          >
            <span v-if="headItems[index]?.type === 'text'">{{item}}</span>
            <div v-else
                 class="img-container"
                 :class="[
                    headItems[index]?.type === 'avatar' ? 'list__avatar rounded-full' : 'list__preview aspect-16_9',
                 ]"
                 @click.stop="openFancybox(item)"
            >
              <img :src="item" alt="фото">
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>

</template>