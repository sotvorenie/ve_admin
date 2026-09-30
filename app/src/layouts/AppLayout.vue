<script setup lang="ts">
import AppAside from "@layouts/AppAside.vue";
import AppHeader from "@layouts/AppHeader.vue";
</script>

<template>

  <div class="grid grid-cols-12 h-screen overflow-hidden">
    <AppAside class="col-span-2"/>

    <div class="flex flex-col gap-8 py-4 px-10 w-full col-span-10 overflow-x-hidden">
      <AppHeader/>

      <main class="overflow-x-hidden h-full overflow-y-auto relative">
        <router-view/>
      </main>
    </div>
  </div>

</template>