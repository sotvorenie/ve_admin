export interface User {
    id: number
    name: string
    avatarUrl: string
}

export interface UserWithToken {
    user: User,
    token: string
}

export interface AppUser extends User {
    login: string
    createdAt: string
    updatedAt: string
}