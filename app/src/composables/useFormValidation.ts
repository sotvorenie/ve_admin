const errors = {
    minLength: (value: string) => `минимальное количество символов - ${value}`,
}

const getErrorValue = (target: HTMLInputElement): string => {
    for (let [errKey, errVal] of Object.entries(errors)) {
        if (target.hasAttribute(errKey)) {
            if (target.checkValidity()) return ''
            const attrValue = target.getAttribute(errKey) ?? ''
            return errVal(attrValue)
        }
    }
    return ''
}

const setError = (event: Event): HTMLInputElement | null => {
    const target = (event?.target ?? event) as HTMLInputElement

    if (!target?.required || !target?.id) return null

    const formElement = target.closest('[data-js-form]')
    const errorElement: HTMLSpanElement | undefined | null = formElement?.querySelector(`[data-js-error-for-${target.id}]`)

    const errorValue = getErrorValue(target)

    if (errorElement) errorElement.textContent = errorValue

    return errorValue ? target : null
}

export const onBlur = (event: Event) => {
    return setError(event)
}

export const onSubmit = (event: Event): boolean => {
    event.preventDefault()
    const target = event.target as HTMLFormElement

    let firstRequiredInput: HTMLInputElement | null = null

    target.querySelectorAll('input[required]')?.forEach(el => {
        const fakeEvent = { target: el } as unknown as Event
        const inputElement = setError(fakeEvent)
        if (!firstRequiredInput && inputElement) firstRequiredInput = inputElement
    })

    if (firstRequiredInput) {
        (firstRequiredInput as HTMLInputElement)?.focus()
        return false
    }
    return true
}

export const onInput = (event: Event) => {
    setError(event)
}