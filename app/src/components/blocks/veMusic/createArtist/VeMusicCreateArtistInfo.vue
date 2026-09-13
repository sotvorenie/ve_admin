<script setup lang="ts">
import LabelUi from "@ui/LabelUi.vue";
import InputUi from "@ui/InputUi.vue";

import CrossIcon from "@icons/CrossIcon.vue";

defineProps<{
  isLoading: boolean
}>()

const name = defineModel<string>('name', {required: true})
</script>

<template>

  <form novalidate class="flex flex-column gap-10 w-100">
    <LabelUi text="Исполнитель:">
      <InputUi v-model="name"
               :disabled="isLoading"
               maxlength="255"
               :action-btn="{
                      icon: CrossIcon,
                      func: () => name = '',
                      visible: !!name?.length
                   }"
      />
    </LabelUi>
  </form>

</template>