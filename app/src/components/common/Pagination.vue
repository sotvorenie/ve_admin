<script setup lang="ts">
import {computed} from "vue";

import SelectArrowIcon from "@icons/SelectArrowIcon.vue";

const props = withDefaults(
    defineProps<{
      total: number
      limit: number
    }>(), {
      limit: 30
    }
)

const activePage = defineModel<number>({
  required: true,
  default: 1
})

const btnClass = 'pagination__btn button-width-svg flex-center text-center rounded-12 border border-dark-muted hover:border-accent hover:text-accent'

const maxPage = computed(() => Math.ceil(props.total / props.limit))

const pages = computed(() => {
  const visiblePages = []

  const total = maxPage.value
  const current = activePage.value

  if (total < 6) {
    for (let i = 1; i <= total; i++) visiblePages.push(i)
  } else {
    visiblePages.push(1)

    const start = Math.min(2, current - 1)
    const end = Math.max(total - 1, current + 1)

    if (start > 2) visiblePages.push(-1)

    for (let i = start; i <= end; i++) visiblePages.push(i)

    if (end < total - 1) visiblePages.push(-1)

    visiblePages.push(total)
  }

  return visiblePages
})

const handlePage = (page: number) => {
  activePage.value = page
}
</script>

<template>

  <div v-if="maxPage > 1" class="pagination flex-center gap-20 mt-24">
    <button :class="['pagination__prev', btnClass]"
            :disabled="activePage === 1"
            type="button"
            @click="activePage = Math.max(1, activePage - 1)"
    >
      <SelectArrowIcon/>
    </button>

    <div class="flex align-end gap-4">
      <template v-for="page in pages"
                :key="page"
      >
        <span v-if="page === -1" class="mx-8">...</span>
        <button v-else
                :class="[
                    btnClass,
                    page === activePage && 'border-accent pointer-none text-accent'
                ]"
                @click="handlePage(page)"
        >
          {{page}}
        </button>
      </template>
    </div>

    <button :class="['pagination__next', btnClass]"
            type="button"
            :disabled="activePage === maxPage"
            @click="activePage = Math.min(maxPage, activePage + 1)"
    >
      <SelectArrowIcon/>
    </button>
  </div>

</template>