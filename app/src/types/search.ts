export enum SearchType {
    MUSIC = 'MUSIC',
    ARTISTS = 'ARTISTS',
}

export interface Search {
    id: number
    search: string
    type: SearchType
}