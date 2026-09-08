import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMessageStore = defineStore('messageStore', () => {
    const message = ref<string>('')
    const isVisible = ref<boolean>(false)
    let timer: number | null = null

    const show = (msg: string) => {
        message.value = msg
        isVisible.value = true

        if (timer) clearTimeout(timer)

        timer = window.setTimeout(() => {
            isVisible.value = false
        }, 3500)
    }

    const hide = () => {
        isVisible.value = false
        if (timer) clearTimeout(timer)
    }

    return {
        message,
        isVisible,
        show,
        hide,
    }
})

export default useMessageStore;