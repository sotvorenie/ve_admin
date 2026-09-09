export function debounce<T extends (...args: any[]) => any>(
    fn: T,
    delay: number
) {
    let timer: ReturnType<typeof setTimeout> | null = null

    return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
        if (timer) clearTimeout(timer)

        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}