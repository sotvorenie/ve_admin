<script setup lang="ts">
import AppAside from "@layouts/AppAside.vue";
import AppHeader from "@layouts/AppHeader.vue";
</script>

<template>

  <div class="row h-screen overflow-hidden">
    <AppAside class="col-2"/>

    <div class="flex flex-column gap-30 py-20 px-40 w-100 col-10 overflow-x-hidden">
      <AppHeader/>

      <main class="overflow-x-hidden overflow-y-auto position-relative">
        <router-view/>
      </main>
    </div>
  </div>

</template>