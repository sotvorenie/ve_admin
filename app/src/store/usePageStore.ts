import {defineStore} from "pinia";
import {ref} from "vue";

const usePageStore = defineStore('pageStore', () => {
    const pageTitle = ref<string>('Главная')

    // данные для кнопки добавления
    const createBtnInfo = ref<{label: string, to: string}>({
        label: '',
        to: '',
    })

    return {
        pageTitle,
        createBtnInfo,
    }
})

export default usePageStore;