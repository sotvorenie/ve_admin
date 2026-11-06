export interface ListHead {
    label: string
    key: string
    type: 'text' | 'avatar' | 'preview' | 'poster' | 'date'
    formatFunction?: Function
    to?: {
        page: string
        id?: string
    }
    isDate?: boolean
}

export interface ListItem {
    url: string
    info: any
}