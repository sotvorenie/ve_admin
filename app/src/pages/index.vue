<script setup lang="ts">
import {productsData} from "@data/products.ts";
</script>

<template>

  <div class="index h-100">
    <ul class="grid-cols-3 align-center gap-20 h-100 px-30">
      <li v-for="item in productsData"
          :key="item.label"
      >
        <RouterLink
            :to="item.url"
            class="index__link w-100 position-relative border border-dark-muted rounded-20 aspect-1 hover:border-accent flex-center"
        >
          <div
              v-if="item?.icon"
              class="index__icon-container absolute-x-center flex-center rounded-20 border bg-dark transition-colors"
          >
            <Component :is="item.icon"
                       class="index__icon h-100 w-100"
            />
          </div>

          <span class="h1 text-w600">{{item.label}}</span>
        </RouterLink>
      </li>
    </ul>
  </div>

</template>