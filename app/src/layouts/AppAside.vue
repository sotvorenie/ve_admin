<script setup lang="ts">
import {useRoute} from "vue-router";

import {productsData} from "@data/products.ts";

const route = useRoute()
</script>

<template>

  <aside class="aside border-r border-light-alt py-20 px-12">
    <RouterLink to="/" class="w-100 flex-center mb-30 text-w600 h3">
      Админка
    </RouterLink>

    <nav>
      <ul class="aside__list flex flex-column gap-10">
        <li v-for="item in productsData"
            :key="item.label"
        >
          <RouterLink :to="item.url"
                      class="w-100 p-6 rounded-12 border border-dark-muted flex align-center gap-6"
                      :class="[
                          route.path.includes(item.url) && 'bg-dark-muted pointer-none cursor-default',
                      ]"
          >
            <Component v-if="item.icon"
                       :is="item.icon"
                       class="aside__icon"
            />
            <span class="text-w500">{{item.label}}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </aside>

</template>