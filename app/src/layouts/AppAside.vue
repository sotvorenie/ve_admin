<script setup lang="ts">
import {productsData} from "@data/products.ts";

import useUserStore from "@store/useUserStore.ts";
const userStore = useUserStore();
</script>

<template>

  <aside class="aside border-r border-light-alt py-20 px-12 flex flex-column">
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
                          $route.path.includes(item.url) && 'bg-dark-muted',
                      ]"
          >
            <Component v-if="item.icon"
                       :is="item.icon"
                       class="aside__icon"
            />
            <span class="text-w500 text-ellipsis">{{item.label}}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <RouterLink to="/user" class="aside__user mt-auto flex align-center gap-10">
      <div class="aside__avatar rounded-full img-container">
        <img :src="`${userStore.user.avatarUrl}?t=${Date.now()}`"
             :alt="userStore.user.name"
        >
      </div>

      <span class="text-w500 text-ellipsis">{{userStore.user.name}}</span>
    </RouterLink>
  </aside>

</template>