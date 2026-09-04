import {defineStore} from "pinia";
import {ref} from "vue";
import {AppUserType} from "@/types/user.ts";
import {MusicForListType} from "@/types/music.ts";

const useVeMusicStore = defineStore('veMusicStore', () => {
    // выбранный пользователь
    const currentUser = ref<AppUserType | null>(null)

    // выбранная музыка
    const currentMusic = ref<MusicForListType| null>(null)

    return {
        currentUser,
        currentMusic,
    }
})

export default useVeMusicStore;