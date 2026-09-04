import {BasePaginationType} from "@/types/basePagination.ts";

export interface UserType {
    id: number
    name: string
    avatarUrl: string
}

export interface UserWithTokenType {
    user: UserType,
    token: string
}

export interface AppUserType extends UserType {
    login: string
}

export interface AppUsersResponseType extends BasePaginationType {
    users: AppUserType[]
}