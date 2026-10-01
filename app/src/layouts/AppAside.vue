<script setup lang="ts">
import {productsData} from "@data/products.ts";

import {BASE_URL} from "@api/url.ts";

import Icon from "@ui/Icon.vue";

import NotImageIcon from "@icons/NotImageIcon.vue";``

import useUserStore from "@store/useUserStore.ts";
const userStore = useUserStore();
</script>

<template>

  <aside class="border-r border-white/50 py-4 px-4 flex flex-col">
    <RouterLink to="/" class="text-center mb-8 font-semibold text-2xl transition-colors">
      Админка
    </RouterLink>

    <nav>
      <ul class="flex flex-col gap-3">
        <li v-for="item in productsData"
            :key="item.label"
        >
          <RouterLink :to="item.url"
                      class="recolor-svg w-full p-1 rounded-xl border border-white/50 hover:bg-white/10 flex items-center gap-2 transition-colors"
                      :class="$route.path.includes(item.url) && 'bg-white/25'"
          >
            <Component v-if="item.icon"
                       :is="item.icon"
                       class="w-10 3xl:w-13 h-auto aspect-square"
            />
            <span class="font-semibold truncate text-xl">{{item.label}}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <RouterLink to="/user" class="mt-auto flex items-center gap-3 transition-colors">
      <div class="w-10 aspect-square rounded-full bg-black/50 img-container recolor-svg">
        <img v-if="userStore.user?.avatarUrl"
             :src="`${BASE_URL}${userStore.user.avatarUrl}?t=${Date.now()}`"
             :alt="userStore.user.name"
        >
        <Icon v-else :name="NotImageIcon" :size="15"/>
      </div>

      <span class="font-semibold truncate text-lg">{{userStore.user.name}}</span>
    </RouterLink>
  </aside>

</template>