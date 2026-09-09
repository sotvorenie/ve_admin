import {UserWithTokenType} from "@/types/user.ts";

import {apiPost} from "@api/index.ts";

export const apiRegister = async (login: string, password: string, name: string, signal?: AbortSignal): Promise<UserWithTokenType> => {
    return apiPost(`/auth/register`, {
        login,
        password,
        name
    }, {signal})
}