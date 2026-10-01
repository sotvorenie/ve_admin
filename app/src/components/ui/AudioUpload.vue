<script setup lang="ts">
import {showConfirm} from "@utils/modals.ts";

import Upload from "@ui/Upload.vue";
import Icon from "@ui/Icon.vue";

import EditIcon from "@icons/EditIcon.vue";
import CrossIcon from "@icons/CrossIcon.vue";
import AudioIcon from "@icons/AudioIcon.vue";
import NotAudioIcon from "@icons/NotAudioIcon.vue";

const props = withDefaults(
    defineProps<{
      audioUrl: string | undefined | null
      showConfirm?: boolean
      audioTitle?: string | undefined
      disabled?: boolean
      canDelete?: boolean
    }>(), {
      disabled: true,
      showConfirm: true,
      canDelete: true,
    }
)

const emits = defineEmits<{
  select: [file: File],
  delete: any,
}>()

const handleUpload = async (file: File) => {
  const confirm = props.showConfirm ? await showConfirm(
      'Загрузка аудио',
      'Вы действительно хотите загрузить/изменить аудио?'
  ) : true
  if (confirm) {
    emits('select', file)
  }
}
</script>

<template>

  <Upload accept=".mp3,.wav"
          :disabled="disabled"
          @select="(files: File[]) => handleUpload(files[0])"
          class="h-full"
          :class="disabled && 'pointer-none'"
  >
    <div class="img-upload recolor-svg img-container relative rounded-xl h-full bg-text-alt"
         :class="!audioUrl && 'border'"
         title="Загрузить аудио"
    >
      <div v-if="audioUrl" class="flex items-center justify-center flex-col gap-5 px-3 w-full">
        <Icon :name="AudioIcon" :size="80"/>

        <span class="text-xs truncate text-center w-full">{{audioTitle}}</span>
      </div>

      <div v-else class="flex flex-col items-center gap-5 w-full">
        <Icon :name="NotAudioIcon" :size="80"/>

        <span class="truncate text-center">Загрузите аудио</span>
      </div>

      <EditIcon class="img-upload__icon absolute -translate-1/2 top-1/2 left-1/2 transition-opacity z-1"/>

      <button v-if="audioUrl && canDelete"
              class="img-upload__delete rounded-full border flex items-center justify-center z-10 hover:text-accent absolute transition-all cursor-pointer"
              :disabled="disabled"
              type="button"
              title="Удалить"
              @click.stop="emits('delete')"
      >
        <Icon :name="CrossIcon" :size="18"/>
      </button>
    </div>
  </Upload>

</template>