export const formatPath = (url: string, type: 'veMusic') => {
    if (!url) return ''

    const envUrls: Record<string, string> = {
        veMusic: 'VITE_VE_MUSIC_PATH',
    }

    const formattedUrl = url
        .replace('/static/', '')
        .replace(/\//g, '\\')
    return `${import.meta.env[envUrls[type]]}\\${formattedUrl}`
}