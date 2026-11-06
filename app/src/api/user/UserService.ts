import {Url} from "@/types/url.ts";

import {apiPatch, apiPost} from "@/api";

export const UserService = {
    updateName(
        name: string,
        signal?: AbortSignal,
    ): Promise<void> {
        const payload = {
            name,
        }

        return apiPatch(`/user/update_name`, payload, {signal})
    },

    updatePassword(
        password: string,
        signal?: AbortSignal,
    ): Promise<void> {
        const payload = {
            password,
        }

        return apiPatch(`/user/update_password`, payload, {signal})
    },

    uploadAvatar(
        file: File,
        signal?: AbortSignal,
    ): Promise<Url> {
        const form = new FormData()
        form.append('avatar', file)

        return apiPost(`/user/upload_avatar`, form, {signal})
    },

    deleteAvatar(
        signal?: AbortSignal,
    ): Promise<void> {
        return apiPatch(`/user/delete_avatar`, undefined, {signal})
    },
}