export interface ListHeadType {
    label: string
    type: 'text' | 'avatar' | 'preview'
}

export interface ListItemType {
    url: string
    items: string[]
}