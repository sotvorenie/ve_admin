import {ListResponse, PaginatedResponse} from "@/types/response.ts";
import {Genre} from "@/types/genre.ts";
import {TrackPreview} from "@/types/music.ts";

import {apiDelete, apiGet, apiPatch, apiPost} from "@/api";

export const VeMusicGenreService = {
    getAllGenres(
        signal?: AbortSignal,
    ): Promise<ListResponse<Genre>> {
        const params = new URLSearchParams({
            is_admin: String(true),
        })

        return apiGet(`/genres?${params}`, {signal})
    },

    getGenre(
        id: number,
        signal?: AbortSignal,
    ): Promise<Genre> {
        return apiGet(`/genres/admin/${id}`, {signal})
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

        return apiGet(`/genres/admin/${id}/music?${params}`, {signal})
    },

    create(
        name: string,
        signal?: AbortSignal,
    ): Promise<void> {
        const payload = {
            name,
        }

        return apiPost(`/genres/admin`, payload, {signal})
    },

    updateName(
        id: number,
        name: string,
        signal?: AbortSignal,
    ): Promise<void> {
        const payload = {
            name,
        }

        return apiPatch(`/genres/admin/${id}/name`, payload, {signal})
    },

    delete(
        id: number,
        signal?: AbortSignal,
    ): Promise<void> {
        return apiDelete(`/genres/admin/${id}`, {signal})
    },
}