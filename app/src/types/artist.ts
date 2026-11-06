export interface Artist {
    id: number
    name: string
    avatarUrl: string | null
}

export interface CreateArtistForm {
    id: number
    name: string
}

export interface ArtistForm {
    name: string
    avatarUrl: string
}