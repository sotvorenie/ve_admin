<script setup lang="ts">
import {apiDeleteMusicFromUserHistory, apiGetUserHistoryMusic} from "@api/veMusic/history.ts";

import VeMusicList from "@components/veMusic/VeMusicList.vue";

defineProps<{
  userId: number
}>()
</script>

<template>

  <VeMusicList :get-func="apiGetUserHistoryMusic"
               :delete-func="apiDeleteMusicFromUserHistory"
               :user-id="userId"
  />

</template>