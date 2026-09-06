import {UrlType} from "@/types/url.ts";

import {apiPatch, apiPost} from "@/api";

export const apiRedactName = (name: string, signal?: AbortSignal): Promise<void> => {
    return apiPatch(`/user/redact_name`, {name}, {signal})
}

export const apiRedactPassword = (password: string, signal?: AbortSignal): Promise<void> => {
    return apiPatch(`/user/redact_password`, {password}, {signal})
}

export const apiUploadAvatar = (avatar: File, signal?: AbortSignal): Promise<UrlType> => {
    const form = new FormData()
    form.append('avatar', avatar)

    return apiPost(`/user/upload_avatar`, form, {signal})
}

export const apiDeleteAvatar = (signal?: AbortSignal): Promise<void> => {
    return apiPatch(`/user/delete_avatar`, undefined, {signal})
}