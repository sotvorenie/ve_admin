export const formatDuration = (duration: number) => {
    if (!duration) return '00:00'
    const secondsTotal = Math.floor(duration)
    const hours = Math.floor(secondsTotal / 3600)
    const minutes = Math.floor((secondsTotal % 3600) / 60)
    const seconds = secondsTotal % 60
    const hh = String(hours).padStart(2, '0')
    const mm = String(minutes).padStart(2, '0')
    const ss = String(seconds).padStart(2, '0')
    return hours === 0 ? `${mm}:${ss}` : `${hh}:${mm}:${ss}`
}