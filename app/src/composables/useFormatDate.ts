export const formatDate = (str: string) => {
    if (!str) return "Неизвестно"
    const date = new Date(str)
    if (Number.isNaN(date.getTime())) return "Неизвестно"
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth()).padStart(2, '0')
    const year = String(date.getFullYear()).padStart(2, '0')
    return `${day}-${month}-${year}`
}