import {PaginatedResponse} from "@/types/response.ts";
import {AppUser} from "@/types/user.ts";
import {Url} from "@/types/url.ts";

import {apiDelete, apiGet, apiPatch, apiPost} from "@/api";

export const VeMusicUserService = {
    getUsers(
        name: string = '', 
        page: number = 1, 
        limit: number = 30, 
        signal?: AbortSignal,
    ): Promise<PaginatedResponse<AppUser>> {
        const params = new URLSearchParams({
            page: String(page),
            limit: String(limit),
        })

        if (name) params.append('name', name)

        return apiGet(`/user/admin/list?${params}`, {signal})
    },

    getUser(
        id: number,
        signal?: AbortSignal,
    ): Promise<AppUser> {
        return apiGet(`/user/admin/${id}`,{signal})
    },

    updateName(
        id: number,
        name: string,
        signal?: AbortSignal,
    ): Promise<void> {
        const payload = {
            name,
        }

        return apiPatch(`/user/admin/update_name/${id}`,payload, {signal})
    },

    updateLogin(
        id: number,
        login: string,
        signal?: AbortSignal,
    ): Promise<void> {
        const payload = {
            login,
        }

        return apiPatch(`/user/admin/redact_login/${id}`,payload, {signal})
    },

    updatePassword(
        id: number,
        password: string,
        signal?: AbortSignal,
    ): Promise<void> {
        const payload = {
            password,
        }

        return apiPatch(`/user/admin/redact_password/${id}`,payload, {signal})
    },

    delete(
        id: number,
        signal?: AbortSignal,
    ): Promise<void> {
        return apiDelete(`/user/admin/delete/${id}`,{signal})
    },

    uploadAvatar(
        id: number,
        file: File,
        signal?: AbortSignal,
    ): Promise<Url> {
        const formData = new FormData()
        formData.append('avatar', file)

        return apiPost(`/user/admin/upload_avatar/${id}`, formData, {signal})
    },

    deleteAvatar(
        id: number,
        signal?: AbortSignal,
    ): Promise<void> {
        return apiPatch(`/user/admin/delete_avatar/${id}`,undefined, {signal})
    },
}