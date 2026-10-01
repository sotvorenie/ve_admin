<script setup lang="ts">
import {MusicFilesType} from "@/types/music.ts";

import VeMusicPosters from "@components/veMusic/VeMusicPosters.vue";

import AudioUpload from "@ui/AudioUpload.vue";
import ImgUpload from "@ui/ImgUpload.vue";
import VideoUpload from "@ui/VideoUpload.vue";

defineProps<{
  isLoading: boolean
}>()

const form = defineModel<MusicFilesType>('form', {required: true})

const URL = window.URL
</script>

<template>

  <div class="grid grid-cols-3 gap-2.5">
    <AudioUpload
        :audio-url="form.audio ? URL.createObjectURL(form.audio) : ''"
        :disabled="isLoading"
        :audio-title="form.audio?.name"
        :show-confirm="false"
        @select="(file: File) => form.audio = file"
        @delete="form.audio = null"
    />

    <div class="flex flex-col gap-2">
      <ImgUpload
          :img-url="form.previewPath ? form.previewPath : form.preview ? URL.createObjectURL(form.preview) : form.preview"
          :disabled="isLoading"
          :show-confirm="false"
          @select="(file: File) => {
            form.preview = file
            form.previewPath = null
          }"
          @delete="() => {
            form.preview = null
            form.previewPath = null
          }"
          class="aspect-square min-h-0"
      />

      <VeMusicPosters v-model:form="form"/>
    </div>

    <VideoUpload
        :video-url="form.video ? URL.createObjectURL(form.video) : ''"
        :disabled="isLoading"
        :video-title="form.video?.name"
        :show-confirm="false"
        @select="(file: File) => form.video = file"
        @delete="form.video = null"
    />
  </div>

</template>