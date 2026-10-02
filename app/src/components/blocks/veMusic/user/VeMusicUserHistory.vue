<script setup lang="ts">
import {apiDeleteMusicFromUserHistory, apiGetUserHistoryMusic} from "@api/veMusic/history.ts";

import VeMusicList from "@components/veMusic/user/VeMusicList.vue";
</script>

<template>

  <VeMusicList :get-func="apiGetUserHistoryMusic"
               :delete-func="apiDeleteMusicFromUserHistory"
  />

</template>