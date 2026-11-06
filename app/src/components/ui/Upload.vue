<script setup lang="ts">
import {computed, ref} from 'vue'

const props = withDefaults(
    defineProps<{
      accept?: string
      multiple?: boolean
      isDisabled?: boolean
      showFiles?: boolean
    }>(), {
      multiple: false,
      isDisabled: false,
      showFiles: false,
    }
)

const model = defineModel<File | File[] | null>({ default: null })

const isDragging = ref(false)

const files = computed(() => {
  if (!model.value) return []
  return Array.isArray(model.value) ? model.value : [model.value]
})

const updateFiles = (files: File[]) => {
  model.value = props.multiple ? files : (files[0] ?? null)
}

const isValidFile = (file: File): boolean => {
  if (!props.accept) return true

  const acceptTypes = props.accept.split(',').map(t => t.trim().toLowerCase())
  const fileName = file.name.toLowerCase()
  const fileType = file.type.toLowerCase()

  return acceptTypes.some(type => {
    if (type.startsWith('.')) {
      return fileName.endsWith(type)
    }
    if (type.endsWith('/*')) {
      const category = type.slice(0, -2)
      return fileType.startsWith(category)
    }
    return fileType === type
  })
}

const handleFiles = (fileList: FileList | null) => {
  if (!fileList || props.isDisabled) return

  const newFiles = Array.from(fileList).filter(isValidFile)
  if (newFiles.length === 0) return

  const updated = props.multiple
      ? [...files.value, ...newFiles]
      : [newFiles[newFiles.length - 1]]

  updateFiles(updated)
}

const onDrop = (e: DragEvent) => {
  isDragging.value = false
  if (e.dataTransfer?.files) {
    handleFiles(e.dataTransfer.files)
  }
}

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files) {
    handleFiles(target.files)
    target.value = ''
  }
}
</script>

<template>
  <div class="flex flex-col gap-2 w-full">
    <label
        @dragenter.prevent="!isDisabled && (isDragging = true)"
        @dragleave.prevent="!isDisabled && (isDragging = false)"
        @dragover.prevent
        @drop.prevent="!isDisabled && onDrop($event)"
        class="flex flex-col"
        :class="[
            isDisabled ? 'cursor-default pointer-events-none' : 'cursor-pointer',
            { 'bg-accent-soft/50 border-accent': isDragging }
        ]"
    >
      <input type="file" :multiple="multiple" :accept="accept" :disabled="isDisabled" class="hidden" @change="onChange" />
      <slot/>
    </label>
  </div>
</template>