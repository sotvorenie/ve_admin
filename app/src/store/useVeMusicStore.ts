import {defineStore} from "pinia";
import {ref} from "vue";
import {AppUserType} from "@/types/user.ts";
import {MusicForListType} from "@/types/music.ts";
import {GenreType} from "@/types/genre.ts";
import {ArtistType} from "@/types/artist.ts";

const useVeMusicStore = defineStore('veMusicStore', () => {
    // данные для кнопки добавления
    const createBtnInfo = ref<{label: string, to: string}>({
        label: '',
        to: '',
    })

    // выбранный пользователь
    const currentUser = ref<AppUserType | null>(null)

    // выбранная музыка
    const currentMusic = ref<MusicForListType| null>(null)

    // выбранный жанр
    const currentGenre = ref<GenreType | null>(null)

    // выбранный исполнитель
    const currentArtist = ref<ArtistType[] | null>(null)

    return {
        createBtnInfo,
        currentUser,
        currentMusic,
        currentGenre,
        currentArtist,
    }
})

export default useVeMusicStore;