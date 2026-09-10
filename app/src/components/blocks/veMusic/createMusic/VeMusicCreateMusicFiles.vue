<script setup lang="ts">
import {MusicFilesType} from "@/types/music.ts";

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

  <div class="grid-cols-3 gap-10">
    <AudioUpload
        :audio-url="form.audio ? URL.createObjectURL(form.audio) : ''"
        :disabled="isLoading"
        :audio-title="form.audio?.name"
        :show-confirm="false"
        @select="(file: File) => form.audio = file"
        @delete="form.audio = null"
        class="aspect-1 min-w-0"
    />

    <ImgUpload
        :img-url="form.preview ? URL.createObjectURL(form.preview) : ''"
        :disabled="isLoading"
        :show-confirm="false"
        @select="(file: File) => form.preview = file"
        @delete="form.preview = null"
        class="aspect-1 min-w-0"
    />

    <VideoUpload
        :video-url="form.video ? URL.createObjectURL(form.video) : ''"
        :disabled="isLoading"
        :video-title="form.video?.name"
        :show-confirm="false"
        @select="(file: File) => form.video = file"
        @delete="form.video = null"
        class="aspect-1 min-w-0"
    />
  </div>

</template>