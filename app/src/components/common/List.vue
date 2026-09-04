<script setup lang="ts">
import {computed} from "vue";
import {useRouter} from "vue-router";
import { Fancybox } from "@fancyapps/ui"

import {ListHeadType, ListItemType} from "@/types/list.ts";
import {formatDate} from "@composables/useFormatDate.ts";

const props = withDefaults(
    defineProps<{
      headItems: ListHeadType[]
      items: ListItemType[]
      isLoading: boolean
      storeFunc?: Function
      colsStyle?: string
    }>(), {
      isLoading: true
    }
)

const router = useRouter()

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

const handleItem = (row: ListItemType) => {
  if (props.storeFunc) props.storeFunc(row.info)

  router.push(row.url)
}
</script>

<template>

  <div class="list">
    <ul class="border-b border-t"
        :class="colsClass"
        :style="colsStyles"
    >
      <li v-for="headItem in headItems"
          :key="headItem.label"
          class="text-center flex-center first:border-l border-r p-5 break-words"
      >
        {{headItem.label}}
      </li>
    </ul>

    <ul v-if="items?.length" class="flex flex-column">
      <li v-for="row in items"
          :key="row.info.id"
          class="cursor-pointer"
      >
        <div
            v-if="row?.info"
            class="border-b border-light text-center hover:bg-dark-alt"
            :class="colsClass"
            :style="colsStyles"
            @click="handleItem(row)"
        >
          <div v-for="item in headItems"
               :key="item.key"
               class="flex-center first:border-l border-r py-8 px-5"
          >
            <RouterLink v-if="item.to"
                        :to="`${item.to.page}${row.info?.[item.to?.id ?? '']}`"
                        class="text-ellipsis"
            >
              {{row.info?.[item.key]}}
            </RouterLink>

            <template v-else>
              <span v-if="item.type === 'text'" class="text-ellipsis">
                {{item?.formatFunction ? item.formatFunction(row.info?.[item.key]) : row.info?.[item.key]}}
              </span>
              <span v-else-if="item.type === 'date'">
                {{formatDate(row.info?.[item.key])}}
              </span>
              <div v-else
                   class="img-container border border-transparent hover:border-accent transition-colors"
                   :class="[
                    item.type === 'avatar' ? 'list__avatar rounded-full' : 'list__preview aspect-16_9',
                 ]"
                   @click.stop="openFancybox(row.info?.[item.key])"
              >
                <img :src="row.info?.[item.key]" alt="фото">
              </div>
            </template>
          </div>
        </div>
      </li>
    </ul>

    <div v-else-if="!isLoading"
         class="flex-center text-center p-50 border-l border-r border-b text-w500"
    >
      Данных нет..
    </div>

    <div v-else></div>
  </div>

</template>