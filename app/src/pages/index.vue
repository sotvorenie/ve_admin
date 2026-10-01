<script setup lang="ts">
import {productsData} from "@data/products.ts";
</script>

<template>

  <div class="flex items-center justify-center h-full">
    <ul class="grid grid-cols-3 items-center gap-[1.2rem] px-[2rem] w-full 3xl:w-3/4">
      <li v-for="item in productsData"
          :key="item.label"
      >
        <RouterLink
            :to="item.url"
            class="w-full relative border border-white/50 rounded-[1rem] aspect-square hover:border-accent flex flex-col items-center justify-center transition-colors"
        >
          <div
              v-if="item?.icon"
              class="recolor-svg absolute -translate-y-1/2 top-0 bg-text flex items-center justify-center rounded-[1rem] border transition-colors"
          >
            <Component :is="item.icon"
                       class="w-[5rem] h-auto aspect-square"
            />
          </div>

          <span class="text-3xl font-semibold">{{item.label}}</span>
        </RouterLink>
      </li>
    </ul>
  </div>

</template>