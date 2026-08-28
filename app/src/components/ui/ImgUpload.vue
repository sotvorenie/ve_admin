<script setup lang="ts">
import {showConfirm} from "@utils/modals.ts";

import Upload from "@ui/Upload.vue";

import EditIcon from "@icons/EditIcon.vue";
import CrossIcon from "@icons/CrossIcon.vue";

withDefaults(
    defineProps<{
      imgUrl: string | undefined
      disabled: boolean
    }>(), {
      disabled: true,
    }
)

const emits = defineEmits<{
  select: [file: File],
  delete: any,
}>()

const handleUpload = async (file: File) => {
  const confirm = await showConfirm(
      'Загрузка фото',
      'Вы действительно хотите загрузить/изменить фото?'
  )
  if (confirm) {
    emits('select', file)
  }
}
</script>

<template>

  <Upload accept="image/jpeg,image/png"
          :disabled="disabled"
          @select="(files: File[]) => handleUpload(files[0])"
          class="h-100"
  >
    <div class="img-upload flex-center img-container position-relative rounded-20 h-100"
         :class="[
             !imgUrl && 'border border-light-alt',
         ]"
         title="Загрузить фото"
    >
      <span v-if="!imgUrl">Загрузите фото</span>
      <img v-else
           :src="imgUrl"
           alt="фото"
      >

      <EditIcon class="img-upload__icon absolute-center transition-opacity z-1"/>

      <button v-if="imgUrl"
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