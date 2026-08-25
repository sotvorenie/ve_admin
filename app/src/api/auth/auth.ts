import {UserWithToken} from "@/types/user.ts";

import {apiGet, apiPost} from "@api/index.ts";

export const apiAuth = async (login: string, password: string): Promise<UserWithToken> => {
    return apiPost(`/auth/login`, {
        login,
        password
    })
}

export const apiRegister = async (login: string, password: string, name: string): Promise<UserWithToken> => {
    return apiPost(`/auth/register`, {
        login,
        password,
        name
    })
}

export const apiCheckMe = async (): Promise<UserWithToken> => {
    return apiGet('/auth/me')
}