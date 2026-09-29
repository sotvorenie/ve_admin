import {defineStore} from "pinia";
import {ref} from "vue";

const useSearchStore = defineStore('searchStore', () => {
    const searchActive = ref<boolean>(false)

    const searchName = ref<string>('')

    const searchFunc = () => {}

    return {
        searchActive,
        searchName,
        searchFunc,
    }
})

export default useSearchStore;