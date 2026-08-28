<script setup lang="ts">
import Upload from "@ui/Upload.vue";

import EditIcon from "@icons/EditIcon.vue";
import CrossIcon from "@icons/CrossIcon.vue";

defineProps<{
  imgUrl: string | undefined
}>()

const emits = defineEmits<{
  select: [file: File],
  delete: any,
}>()
</script>

<template>

  <Upload accept="image/jpeg,image/png"
          @select="emits('select', $event[0])"
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

      <button class="img-upload__delete button-width-svg rounded-full border flex-center z-10 hover:text-accent position-absolute transition-opacity"
              type="button"
              title="Удалить"
              @click.stop="emits('delete')"
      >
        <CrossIcon/>
      </button>
    </div>
  </Upload>

</template>