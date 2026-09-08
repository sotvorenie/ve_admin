import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useApiUrlStore = defineStore('apiUrlStore', () => {
    const allUrls = {
        admin: import.meta.env.VITE_API_ADMIN_URL,
        veMusic: import.meta.env.VITE_API_VE_MUSIC_URL,
    }

    const activeUrl = ref(allUrls.admin)

    const setUrl = (url: string) => {
        activeUrl.value = url
    }

    return {
        allUrls,
        activeUrl,

        setUrl,
    }
})

export default useApiUrlStore;