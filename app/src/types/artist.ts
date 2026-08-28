import {Meta} from "@/types/meta.ts";

export interface Artist {
    id: number
    name: string
    avatarUrl: string | null
}

export interface ArtistsList extends Meta {
    artists: Artist[]
}

export interface CreatedArtist {
    id: number
    name: string
}