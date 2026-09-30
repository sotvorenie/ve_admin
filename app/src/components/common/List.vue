<script setup lang="ts">
import {computed} from "vue";
import {useRouter} from "vue-router";
import { Fancybox } from "@fancyapps/ui"

import {ListHeadType, ListItemType} from "@/types/list.ts";

import {formatDate} from "@composables/useFormatDate.ts";

import Pagination from "@common/Pagination.vue";

import Icon from "@ui/Icon.vue";

import LoadingIcon from "@icons/LoadingIcon.vue";
import NotImageIcon from "@icons/NotImageIcon.vue";

import useApiUrlStore from "@store/useApiUrlStore.ts";
const apiUrlStore = useApiUrlStore();

const props = withDefaults(
    defineProps<{
      headItems: ListHeadType[]
      items: ListItemType[]
      isLoading: boolean
      total: number
      limit?: number
      storeFunc?: Function
      colsStyle?: string
    }>(), {
      isLoading: true,
      limit: 30
    }
)

const page = defineModel<number>('page', {required: true, default: 1})

const router = useRouter()

const openFancybox = (src: string) => {
  Fancybox.show([
    {
      src,
      type: 'image',
    }
  ])
}

const colsClass = computed(() => props.colsStyle ? 'grid' : `grid grid-cols-[${props.headItems.length}]`)
const colsStyles = computed(() => props.colsStyle && `grid-template-columns: ${props.colsStyle}`)

const handleItem = (row: ListItemType) => {
  if (props.storeFunc) props.storeFunc(row.info)

  router.push(row.url)
}
</script>

<template>

  <div class="flex flex-col h-full">
    <ul class="border-b border-t"
        :class="colsClass"
        :style="colsStyles"
    >
      <li v-for="headItem in headItems"
          :key="headItem.label"
          class="break-words text-center flex items-center justify-center first:border-l border-r p-1"
      >
        {{headItem.label}}
      </li>
    </ul>

    <ul v-if="items?.length" class="flex flex-col overflow-x-hidden overflow-y-auto">
      <li v-for="row in items"
          :key="row.info.id"
          class="cursor-pointer"
      >
        <div
            v-if="row?.info"
            class="border-b border-white text-center hover:bg-black/10 transition-colors"
            :class="colsClass"
            :style="colsStyles"
            @click="handleItem(row)"
        >
          <div v-for="item in headItems"
               :key="item.key"
               class="flex items-center justify-center first:border-l border-r py-2 px-1 min-w-0"
          >
            <div v-if="item.to?.id" class="flex gap-1">
              <RouterLink v-for="id in row.info?.[item.to.id]"
                          :key="id"
                          :to="`${item.to.page}${id}`"
                          class="truncate p-2"
                          @click.stop
              >
                {{id}}
              </RouterLink>
            </div>

            <template v-else>
              <span v-if="item.type === 'text'" class="truncate">
                {{item?.formatFunction ? item.formatFunction(row.info?.[item.key]) : row.info?.[item.key]}}
              </span>
              <span v-else-if="item.type === 'date'">
                {{formatDate(row.info?.[item.key])}}
              </span>
              <div v-else
                   class="img-container border border-transparent transition-colors"
                   :class="[
                      item.type === 'avatar' ? 'w-10 aspect-square rounded-full'
                      : item.type === 'preview' ? 'aspect-16/9' : 'aspect-square w-1/2',
                      row.info?.[item.key] && 'hover:border-accent',
                   ]"
                   @click="row.info?.[item.key] && (() => {
                       $event.stopPropagation()
                       openFancybox(`${apiUrlStore.activeUrl}${row.info[item.key]}`)
                   })()"
              >
                <img v-if="row.info?.[item.key]"
                     :src="`${apiUrlStore.activeUrl}${row.info[item.key]}`"
                     alt="фото"
                >

                <Icon v-else :name="NotImageIcon" :size="15"/>
              </div>
            </template>
          </div>
        </div>
      </li>
    </ul>

    <div v-else-if="!isLoading"
         class="flex items-center justify-center text-center p-12.5 border-l border-r border-b font-medium"
    >
      Данных нет..
    </div>

    <div v-else class="recolor-svg w-full p-7.5 flex items-center justify-center">
      <Icon :name="LoadingIcon" :size="32"/>
    </div>

    <Pagination v-if="items?.length"
                v-model="page"
                :total="total"
    />
  </div>

</template>