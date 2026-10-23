import {BasePaginationType} from "@/types/basePagination.ts";

export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

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
    role: UserRole
    createdAt: string
    updatedAt: string
}

export interface AppUsersResponseType extends BasePaginationType {
    users: AppUserType[]
}