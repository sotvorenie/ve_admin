export interface Artist {
    id: number
    name: string
    avatarUrl: string | null
}

export interface ArtistForm {
    name: string
    avatarUrl: string
}