export interface User {
    id: number
    name: string
}

export interface UserWithToken {
    user: User,
    token: string
}