<script setup lang="ts">
import AppAside from "@layouts/AppAside.vue";
</script>

<template>

  <div class="row h-screen overflow-hidden">
    <AppAside class="col-2"/>

    <main class="col-10 py-20 px-40 overflow-x-hidden overflow-y-auto position-relative">
      <router-view/>
    </main>
  </div>

</template>