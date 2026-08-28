import {Meta} from "@/types/meta.ts";

export interface User {
    id: number
    name: string
    avatarUrl: string
}

export interface UserWithToken {
    user: User,
    token: string
}

export interface AppUserType extends User {
    password: string
    login: string
}

export interface AppUsersResponse extends Meta {
    users: AppUserType[]
}


export interface UserAvatar {
    newAvatarUrl: string
}