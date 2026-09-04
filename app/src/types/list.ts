export interface ListHeadType {
    label: string
    key: string
    type: 'text' | 'avatar' | 'preview' | 'date'
    formatFunction?: Function
    to?: {
        page: string
        id?: string
    }
    isDate?: boolean
}

export interface ListItemType {
    url: string
    info: any
}