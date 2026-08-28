import {GenreType} from "@/types/genre.ts";
import {ArtistType} from "@/types/artist.ts";
import {BasePaginationType} from "@/types/basePagination.ts";

export interface MusicForListType {
    id: number
    name: string
    duration: number
    previewUrl: string | null

    genre: GenreType
    artists: ArtistType[]
}

export interface MusicType {
    id: number
    name: string
    duration: number
    url: string
    auditionsCount: number
    likesCount: number
    previewUrl: string
    videoClipUrl: string | null
    isLiked: boolean

    artists: ArtistType[]
}

export interface MusicListType extends BasePaginationType {
    music: MusicForListType[]
}