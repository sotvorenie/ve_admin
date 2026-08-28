import {UserWithTokenType} from "@/types/user.ts";

import {apiGet, apiPost} from "@api/index.ts";

export const apiAuth = async (login: string, password: string): Promise<UserWithTokenType> => {
    return apiPost(`/auth/login`, {
        login,
        password
    })
}

export const apiRegister = async (login: string, password: string, name: string): Promise<UserWithTokenType> => {
    return apiPost(`/auth/register`, {
        login,
        password,
        name
    })
}

export const apiCheckMe = async (): Promise<UserWithTokenType> => {
    return apiGet('/auth/me')
}