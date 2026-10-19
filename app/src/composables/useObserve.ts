import {MaybeRef, onBeforeUnmount, unref, watch} from "vue";

export const useObserve = (element: MaybeRef<HTMLElement | null>, func: Function, hasMore: MaybeRef<boolean> = true): void => {
    let observer: IntersectionObserver | null = null
    let isProcessing = false

    watch(
        () =>[unref(element), unref(hasMore)] as const,
        ([el, more]) => {
            observer?.disconnect()
            observer = null
            if (!el || !more) return

            observer = new IntersectionObserver(entries => {
                entries.forEach(async (entry) => {
                    console.log(entry.isIntersecting)
                    if (!entry.isIntersecting) return
                    if (isProcessing) return
                    isProcessing = true
                    try {
                        await func()
                    } finally {
                        isProcessing = false
                    }
                })
            }, {
                root: el?.parentElement,
                rootMargin: '300px'
            })

            observer.observe(el)
        },
        {immediate: true, flush: 'post'}
    )

    onBeforeUnmount(() => observer?.disconnect())
}