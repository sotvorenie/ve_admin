<script setup lang="ts">
import {showConfirm} from "@utils/modals.ts";

import Upload from "@ui/Upload.vue";
import Icon from "@ui/Icon.vue";

import EditIcon from "@icons/EditIcon.vue";
import CrossIcon from "@icons/CrossIcon.vue";
import NotImageIcon from "@icons/NotImageIcon.vue";

const props = withDefaults(
    defineProps<{
      imgUrl: string | undefined | null
      showConfirm?: boolean
      disabled?: boolean
      canDelete?: boolean
    }>(), {
      showConfirm: true,
      disabled: true,
      canDelete: true,
    }
)

const emits = defineEmits<{
  select: [file: File],
  delete: any,
}>()

const handleUpload = async (file: File) => {
  const confirm = props.showConfirm ? await showConfirm(
      'Загрузка фото',
      'Вы действительно хотите загрузить/изменить фото?'
  ) : true
  if (confirm) emits('select', file)
}
</script>

<template>

  <Upload accept=".jpg,.jpeg,.png,.webp"
          :disabled="disabled"
          @select="(files: File[]) => handleUpload(files[0])"
          class="h-100"
          :class="disabled && 'pointer-none'"
  >
    <div class="img-upload flex-center img-container position-relative rounded-20 h-100"
         :class="[
             !imgUrl && 'border border-light-alt',
         ]"
         title="Загрузить фото"
    >

      <img v-if="imgUrl"
           :src="imgUrl"
           alt="фото"
      >

      <div v-else class="flex flex-column align-center gap-20 w-100">
        <Icon :name="NotImageIcon" :size="80"/>

        <span class="text-ellipsis text-center">Загрузите фото</span>
      </div>

      <EditIcon class="img-upload__icon absolute-center transition-opacity z-1"/>

      <button v-if="imgUrl && canDelete"
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