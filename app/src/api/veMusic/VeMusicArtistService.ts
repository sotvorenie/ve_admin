import {PaginatedResponse} from "@/types/response.ts";
import {Artist} from "@/types/artist.ts";
import {TrackPreview} from "@/types/music.ts";
import {Url} from "@/types/url.ts";

import {apiDelete, apiGet, apiPatch, apiPost} from "@/api";

export const VeMusicArtistService = {
    getArtists(
        name: string = '',
        page: number = 1,
        limit: number = 30,
        signal?: AbortSignal,
    ): Promise<PaginatedResponse<Artist>> {
        const params = new URLSearchParams({
            page: String(page),
            limit: String(limit),
            is_admin: String(true),
        })

        if (name) params.append('name', name)

        return apiGet(`/artist/list?${params}`, {signal})
    },

    getArtist(
        id: number,
        signal?: AbortSignal,
    ): Promise<Artist> {
        return apiGet(`/artist/admin/${id}`, {signal})
    },

    getArtistMusic(
        id: number,
        page: number = 1,
        limit: number = 30,
        signal?: AbortSignal,
    ): Promise<PaginatedResponse<TrackPreview>> {
        const params = new URLSearchParams({
            page: String(page),
            limit: String(limit),
        })

        return apiGet(`/artist/admin/music/${id}?${params}`, {signal})
    },

    create(
        name: string = '',
        avatarFile: File,
        signal?: AbortSignal,
    ): Promise<void> {
        const form = new FormData()
        form.append('name', name)
        form.append('avatar', avatarFile)

        return apiPost(`/artist/admin/create`, form, {signal})
    },

    delete(
        id: number,
        signal?: AbortSignal,
    ): Promise<void> {
        return apiDelete(`/artist/admin/delete/${id}`, {signal})
    },

    updateName(
        id: number,
        name: string,
        signal?: AbortSignal,
    ): Promise<void> {
        const payload = {
            name,
        }

        return apiPatch(`/artist/admin/update_name/${id}`, payload, {signal})
    },

    uploadAvatar(
        id: number,
        file: File,
        signal?: AbortSignal,
    ): Promise<Url> {
        const formData = new FormData()
        formData.append('avatar', file)

        return apiPost(`/artist/admin/upload_avatar/${id}`, formData, {signal})
    },

    updateAvatarPath(
        id: number,
        path: string,
        signal?: AbortSignal,
    ): Promise<Url> {
        const payload = {
            path,
        }

        return apiPatch(`/artist/admin/update_avatar_path/${id}`, payload, {signal})
    },

    deleteAvatar(
        id: number,
        signal?: AbortSignal,
    ): Promise<void> {
        return apiPatch(`/artist/admin/delete_avatar/${id}`,undefined, {signal})
    },
}