import { onUnmounted } from "vue"

export function useSignal() {
    const controller = new AbortController()

    onUnmounted(() => {
        controller.abort()
    })

    return controller.signal
}