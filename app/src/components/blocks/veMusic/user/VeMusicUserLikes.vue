<script setup lang="ts">
import {apiDeleteMusicFromUserLike, apiGetUserLikeMusic} from "@api/veMusic/like.ts";

import VeMusicList from "@components/veMusic/VeMusicList.vue";

defineProps<{
  userId: number
}>()
</script>

<template>

  <VeMusicList :get-func="apiGetUserLikeMusic"
               :delete-func="apiDeleteMusicFromUserLike"
               :user-id="userId"
  />

</template>