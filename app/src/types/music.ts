import {Genre} from "@/types/genre.ts";
import {Artist} from "@/types/artist.ts";

export interface TrackPreview {
    id: number
    name: string
    duration: number
    url: string
    previewUrl: string | null
    genreId: number

    artists: Artist[]
}

export interface Track {
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

    genre: Genre | null
    artists: Artist[]

    segmentsCount: number
    bitrates: number[]
}

export interface TrackInfo {
    title: string
    genre: number
    artistsIds: number[]
}

export interface TrackFiles {
    audio: File | null
    preview: File | null
    previewPath: string
    video: File | null
}

export interface TrackForm {
    info: TrackInfo
    files: TrackFiles
}