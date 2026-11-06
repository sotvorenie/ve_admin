import {UserWithToken} from "@/types/user.ts";

import {apiPost} from "@/api";

export const VeMusicAuthService = {
    registration(
        login: string,
        password: string,
        name: string,
        signal?: AbortSignal,
    ): Promise<UserWithToken> {
        const payload = {
            login,
            password,
            name,
        }

        return apiPost(`/auth/register`, payload, {signal})
    },
}