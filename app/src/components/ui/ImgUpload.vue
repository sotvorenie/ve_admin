<script setup lang="ts">
import {showConfirm} from "@utils/modals.ts";

import Upload from "@ui/Upload.vue";
import Icon from "@ui/Icon.vue";

import EditIcon from "@icons/EditIcon.vue";
import CrossIcon from "@icons/CrossIcon.vue";
import NotImageIcon from "@icons/NotImageIcon.vue";

import useApiUrlStore from "@store/useApiUrlStore.ts";
const apiUrlStore = useApiUrlStore();

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
          class="h-full"
          :class="disabled && 'pointer-events-none'"
  >
    <div class="img-upload recolor-svg img-container relative rounded-xl h-full bg-text-alt"
         :class="!imgUrl && 'border'"
         title="Загрузить фото"
    >
      <img v-if="imgUrl"
           :src="imgUrl?.includes('blob') ? imgUrl : `${apiUrlStore.activeUrl}${imgUrl}`"
           alt="фото"
      >

      <div v-else class="flex flex-col items-center gap-5 w-full flex-1">
        <Icon :name="NotImageIcon" :size="80"/>

        <span class="truncate text-center w-full">Загрузите фото</span>
      </div>

      <EditIcon class="img-upload__icon absolute -translate-1/2 top-1/2 left-1/2 transition-opacity z-1"/>

      <button v-if="imgUrl && canDelete"
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