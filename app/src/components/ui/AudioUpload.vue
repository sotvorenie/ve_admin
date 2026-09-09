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
    }>(), {
      disabled: true,
      showConfirm: true,
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
          class="h-100"
          :class="disabled && 'pointer-none'"
  >
    <div class="img-upload flex-center img-container position-relative rounded-20 h-100"
         :class="[
             !audioUrl && 'border border-light-alt',
         ]"
         title="Загрузить аудио"
    >
      <div v-if="audioUrl" class="flex-center flex-column gap-20 px-12 w-100">
        <Icon :name="AudioIcon" :size="80"/>

        <span class="text-12 text-ellipsis text-center">{{audioTitle}}</span>
      </div>

      <div v-else class="flex flex-column align-center gap-20 w-100">
        <Icon :name="NotAudioIcon" :size="80"/>

        <span class="text-ellipsis text-center">Загрузите аудио</span>
      </div>

      <EditIcon class="img-upload__icon absolute-center transition-opacity z-1"/>

      <button v-if="audioUrl"
              class="img-upload__delete button-width-svg rounded-full border flex-center z-10 hover:text-accent position-absolute transition-opacity"
              :disabled="disabled"
              type="button"
              title="Удалить"
              @click.stop="emits('delete')"
      >
        <CrossIcon/>
      </button>
    </div>
  </Upload>

</template>