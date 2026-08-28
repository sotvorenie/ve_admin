import {BasePaginationType} from "@/types/basePagination.ts";

export interface ArtistType {
    id: number
    name: string
    avatarUrl: string | null
}

export interface ArtistsListType extends BasePaginationType {
    artists: ArtistType[]
}

export interface CreatedArtistType {
    id: number
    name: string
}