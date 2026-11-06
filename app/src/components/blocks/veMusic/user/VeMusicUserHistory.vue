<script setup lang="ts">
import {VeMusicHistoryService} from "@api/veMusic/VeMusicHistoryService.ts";

import VeMusicList from "@components/veMusic/user/VeMusicList.vue";
</script>

<template>

  <VeMusicList :get-func="VeMusicHistoryService.getHistoryMusic"
               :delete-func="VeMusicHistoryService.delete"
  />

</template>