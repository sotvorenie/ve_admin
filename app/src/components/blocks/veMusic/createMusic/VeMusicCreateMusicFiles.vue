<script setup lang="ts">
import {MusicForm} from "@/types/music.ts";

import VeMusicPosters from "@components/veMusic/VeMusicPosters.vue";

import AudioUpload from "@ui/AudioUpload.vue";
import ImgUpload from "@ui/ImgUpload.vue";
import VideoUpload from "@ui/VideoUpload.vue";

defineProps<{
  isLoading: boolean
}>()

const form = defineModel<MusicForm>('form', {required: true})

const URL = window.URL
</script>

<template>

  <div class="grid grid-cols-3 gap-2.5">
    <AudioUpload
        :audio-url="form.files.audio ? URL.createObjectURL(form.files.audio) : ''"
        :disabled="isLoading"
        :audio-title="form.files.audio?.name"
        :show-confirm="false"
        @select="(file: File) => form.files.audio = file"
        @delete="form.files.audio = null"
    />

    <div class="flex flex-col gap-2">
      <ImgUpload
          :img-url="form.files.previewPath ? form.files.previewPath : form.files.preview ? URL.createObjectURL(form.files.preview) : form.files.preview"
          :disabled="isLoading"
          :show-confirm="false"
          @select="(file: File) => {
            form.files.preview = file
            form.files.previewPath = ''
          }"
          @delete="() => {
            form.files.preview = null
            form.files.previewPath = ''
          }"
          class="aspect-square min-h-0"
      />

      <VeMusicPosters v-model:form="form" :disabled="isLoading"/>
    </div>

    <VideoUpload
        :video-url="form.files.video ? URL.createObjectURL(form.files.video) : ''"
        :disabled="isLoading"
        :video-title="form.files.video?.name"
        :show-confirm="false"
        @select="(file: File) => form.files.video = file"
        @delete="form.files.video = null"
    />
  </div>

</template>