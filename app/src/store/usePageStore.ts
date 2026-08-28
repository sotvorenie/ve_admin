import {defineStore} from "pinia";
import {ref} from "vue";

const usePageStore = defineStore('pageStore', () => {
    const pageTitle = ref<string>('Главная')

    return {
        pageTitle
    }
})

export default usePageStore;