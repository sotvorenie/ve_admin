import {UserWithToken} from "@/types/user.ts";

import {apiCheckMeGet, apiPost} from "@/api";

export const AuthService = {
    auth(
        login: string,
        password: string,
        signal?: AbortSignal,
    ): Promise<UserWithToken> {
        const payload = {
            login,
            password,
        }

        return apiPost(`/auth/login`, payload, {signal})
    },

    registration(
        login: string,
        password: string,
        name: string, signal?: AbortSignal,
    ): Promise<UserWithToken> {
        const payload = {
            login,
            password,
            name,
        }

        return apiPost(`/auth/register`, payload, {signal})
    },

    getMe(): Promise<UserWithToken> {
        return apiCheckMeGet('/auth/me')
    },
}