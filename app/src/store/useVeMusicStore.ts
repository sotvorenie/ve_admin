import {defineStore} from "pinia";
import {ref} from "vue";

import {Track} from "@/types/music.ts";
import {AppUser} from "@/types/user.ts";
import {Genre} from "@/types/genre.ts";
import {Artist} from "@/types/artist.ts";

const useVeMusicStore = defineStore('veMusicStore', () => {
    const currentUser = ref<AppUser | null>(null)

    const currentMusic = ref<Track | null>(null)

    const currentGenre = ref<Genre | null>(null)

    const currentArtist = ref<Artist | null>(null)

    return {
        currentUser,
        currentMusic,
        currentGenre,
        currentArtist,
    }
})

export default useVeMusicStore;