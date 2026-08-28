import {Genre} from "@/types/genre.ts";
import {Artist} from "@/types/artist.ts";
import {Meta} from "@/types/meta.ts";

export interface MusicForList {
    id: number
    name: string
    duration: number
    previewUrl: string | null

    genre: Genre
    artists: Artist[]
}

export interface Music {
    id: number
    name: string
    duration: number
    url: string
    auditionsCount: number
    likesCount: number
    previewUrl: string
    videoClipUrl: string | null
    isLiked: boolean

    artists: Artist[]
}

export interface MusicList extends Meta{
    music: MusicForList[]
}