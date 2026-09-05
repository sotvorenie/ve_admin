import {UserWithTokenType} from "@/types/user.ts";

import {apiGet, apiPost} from "@api/index.ts";

export const apiAuth = async (login: string, password: string, signal?: AbortSignal): Promise<UserWithTokenType> => {
    return apiPost(`/auth/login`, {
        login,
        password
    }, undefined, signal)
}

export const apiRegister = async (login: string, password: string, name: string, signal?: AbortSignal): Promise<UserWithTokenType> => {
    return apiPost(`/auth/register`, {
        login,
        password,
        name
    }, undefined, signal)
}

export const apiCheckMe = async (): Promise<UserWithTokenType> => {
    return apiGet('/auth/me')
}