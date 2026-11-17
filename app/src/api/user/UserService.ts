import {Url} from "@/types/url.ts";

import {apiDelete, apiPatch, apiPost} from "@/api";

export const UserService = {
    updateName(
        name: string,
        signal?: AbortSignal,
    ): Promise<void> {
        const payload = {
            name,
        }

        return apiPatch(`/user/name`, payload, {signal})
    },

    updatePassword(
        password: string,
        signal?: AbortSignal,
    ): Promise<void> {
        const payload = {
            password,
        }

        return apiPatch(`/user/password`, payload, {signal})
    },

    uploadAvatar(
        file: File,
        signal?: AbortSignal,
    ): Promise<Url> {
        const form = new FormData()
        form.append('avatar', file)

        return apiPost(`/user/avatar`, form, {signal})
    },

    deleteAvatar(
        signal?: AbortSignal,
    ): Promise<void> {
        return apiDelete(`/user/avatar`, {signal})
    },
}