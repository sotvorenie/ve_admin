import {ListResponse, PaginatedResponse} from "@/types/response.ts";
import {Genre} from "@/types/genre.ts";
import {TrackPreview} from "@/types/music.ts";

import {apiDelete, apiGet, apiPatch, apiPost} from "@/api";

export const VeMusicGenreService = {
    getAllGenres(
        signal?: AbortSignal,
    ): Promise<ListResponse<Genre>> {
        return apiGet(`/genre/all?is_admin=true`, {signal})
    },

    getGenre(
        id: number,
        signal?: AbortSignal,
    ): Promise<Genre> {
        return apiGet(`/genre/admin/${id}`, {signal})
    },

    getGenreMusic(
        id: number,
        page: number = 1,
        limit: number = 30,
        signal?: AbortSignal,
    ): Promise<PaginatedResponse<TrackPreview>> {
        const params = new URLSearchParams({
            page: String(page),
            limit: String(limit),
        })

        return apiGet(`/genre/admin/music/${id}?${params}`, {signal})
    },

    updateName(
        id: number, 
        name: string,
        signal?: AbortSignal,
    ): Promise<void> {
        const payload = {
            name,
        }

        return apiPatch(`/genre/admin/update_name/${id}`, payload, {signal})
    },

    create(
        name: string,
        signal?: AbortSignal,
    ): Promise<void> {
        const payload = {
            name,
        }

        return apiPost(`/genre/admin/create`, payload, {signal})
    },

    delete(
        id: number,
        signal?: AbortSignal,
    ): Promise<void> {
        return apiDelete(`/genre/admin/delete/${id}`, {signal})
    },
}