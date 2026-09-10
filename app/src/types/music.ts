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
    genreId: number
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

export interface MusicFilesType {
    audio: File | null
    preview: File | null
    video: File | null
}

export interface MusicInfoType {
    title: string
    genre: number
    artistsIds: number[]
}