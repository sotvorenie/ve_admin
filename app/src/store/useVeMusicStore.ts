import {defineStore} from "pinia";
import {ref} from "vue";
import {AppUserType} from "@/types/user.ts";

const useVeMusicStore = defineStore('veMusicStore', () => {
    // выбранный пользователь
    const currentUser = ref<AppUserType | null>(null)

    return {
        currentUser,
    }
})

export default useVeMusicStore;