export interface ListHeadType {
    label: string
    key: string
    type: 'text' | 'avatar' | 'preview'
}

export interface ListItemType {
    url: string
    info: any
}