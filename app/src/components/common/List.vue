<script setup lang="ts">
import {computed} from "vue";
import {useRouter} from "vue-router";
import { Fancybox } from "@fancyapps/ui"

import {ListHeadType, ListItemType} from "@/types/list.ts";

import {formatDate} from "@composables/useFormatDate.ts";

import Icon from "@ui/Icon.vue";

import LoadingIcon from "@icons/LoadingIcon.vue";
import NotImageIcon from "@icons/NotImageIcon.vue";

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
               class="flex-center first:border-l border-r py-8 px-5 min-w-0"
          >
            <div v-if="item.to?.id" class="flex gap-4">
              <RouterLink v-for="id in row.info?.[item.to.id]"
                          :key="id"
                          :to="`${item.to.page}${id}`"
                          class="text-ellipsis p-8"
                          @click.stop
              >
                {{id}}
              </RouterLink>
            </div>

            <template v-else>
              <span v-if="item.type === 'text'" class="text-ellipsis">
                {{item?.formatFunction ? item.formatFunction(row.info?.[item.key]) : row.info?.[item.key]}}
              </span>
              <span v-else-if="item.type === 'date'">
                {{formatDate(row.info?.[item.key])}}
              </span>
              <div v-else
                   class="img-container border border-transparent transition-colors"
                   :class="[
                      item.type === 'avatar' ? 'list__avatar rounded-full' : 'list__preview aspect-16_9',
                      row.info?.[item.key] && 'hover:border-accent',
                   ]"
                   @click="row.info?.[item.key] && (() => {
                       $event.stopPropagation()
                       openFancybox(row.info[item.key])
                   })()"
              >
                <img v-if="row.info?.[item.key]"
                     :src="row.info[item.key]"
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
         class="flex-center text-center p-50 border-l border-r border-b text-w500"
    >
      Данных нет..
    </div>

    <div v-else class="w-100 p-30 flex-center">
      <Icon :name="LoadingIcon" :size="32"/>
    </div>
  </div>

</template>