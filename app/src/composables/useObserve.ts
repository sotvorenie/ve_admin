import {
    type MaybeRef,
    type MaybeRefOrGetter,
    onBeforeUnmount,
    toValue,
    watch,
    nextTick,
} from 'vue'

export const useObserve = (
    element: MaybeRef<HTMLElement | null>,
    func: () => Promise<void> | void,
    hasMore: MaybeRefOrGetter<boolean> = true,
    root: MaybeRefOrGetter<HTMLElement | null> = null,
    loading: MaybeRefOrGetter<boolean> = false,
) => {
    let observer: IntersectionObserver | null = null
    let isProcessing = false
    let cooldownUntil = 0

    const canRun = () =>
        !isProcessing &&
        Date.now() >= cooldownUntil &&
        toValue(hasMore) &&
        !toValue(loading) &&
        !!toValue(element)

    const run = async () => {
        if (!canRun()) return
        isProcessing = true
        try {
            await func()
        } finally {
            isProcessing = false
            cooldownUntil = Date.now() + 400
        }
    }

    watch(
        () => [toValue(element), toValue(hasMore), toValue(root), toValue(loading)] as const,
        async ([el, more, rt, busy]) => {
            observer?.disconnect()
            observer = null

            if (!el || !more || busy) return

            await nextTick()
            if (!el.isConnected) return

            observer = new IntersectionObserver(
                (entries) => {
                    for (const entry of entries) {
                        if (!entry.isIntersecting) continue
                        run()
                    }
                },
                { root: rt, rootMargin: '300px' },
            )
            observer.observe(el)
        },
        { immediate: true },
    )

    onBeforeUnmount(() => {
        observer?.disconnect()
    })
}