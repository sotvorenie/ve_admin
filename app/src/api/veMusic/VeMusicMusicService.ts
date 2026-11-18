import {PaginatedResponse} from "@/types/response.ts";
import {Track, TrackPreview} from "@/types/music.ts";
import {Url} from "@/types/url.ts";

import {apiDelete, apiGet, apiPatch} from "@/api";

export const VeMusicMusicService = {
    getTracks(
        name: string = '',
        genreId: number = -1,
        artistId: number = -1,
        page: number = 1,
        limit: number = 30,
        signal?: AbortSignal,
    ): Promise<PaginatedResponse<TrackPreview>> {
        const params = new URLSearchParams({
            page: String(page),
            limit: String(limit),
            is_admin: String(true),
        })

        if (name) params.append('name', name)
        if (artistId >= 0) params.append('artist_id', String(artistId))
        if (genreId >= 0) params.append('genre_id', String(genreId))

        return apiGet(`/music?${params}`, {signal})
    },

    getTrack(
        id: number,
        signal?: AbortSignal,
    ): Promise<Track> {
        const params = new URLSearchParams({
            is_admin: String(true),
        })

        return apiGet(`/music/${id}?${params}`, {signal})
    },

    update(
        id: number,
        name: string,
        genreId: number,
        artists: number[],
        signal?: AbortSignal,
    ) {
        const payload = {
            name,
            genre_id: String(genreId),
            artists: artists.join(','),
        }

        return apiPatch(`/music/admin/${id}`, payload, {signal})
    },

    updatePreviewPath(
        id: number,
        path: string,
        signal?: AbortSignal,
    ): Promise<Url> {
        const payload = {
            path,
        }

        return apiPatch(`/music/admin/${id}/preview/path`, payload, {signal})
    },

    updatePreviewUrl(
        id: number,
        url: string,
        signal?: AbortSignal,
    ): Promise<Url> {
        const payload = {
            url,
        }

        return apiPatch(`/music/admin/${id}/preview/url`, payload, {signal})
    },

    updateAuditions(
        id: number,
        auditionsCount: number,
        signal?: AbortSignal,
    ): Promise<void> {
        const payload = {
            auditions_count: auditionsCount
        }

        return apiPatch(`/music/admin/${id}/auditions`, payload, {signal})
    },

    delete(
        id: number,
        signal?: AbortSignal,
    ): Promise<void> {
        return apiDelete(`/music/admin/${id}`, {signal})
    },

    deletePreview(
        id: number,
        signal?: AbortSignal,
    ): Promise<void> {
        return apiDelete(`/music/admin/${id}/preview`, {signal})
    },

    deleteVideo(
        id: number,
        signal?: AbortSignal,
    ): Promise<void> {
        return apiDelete(`/music/admin/${id}/video`, {signal})
    },

    getPosters(
        page: number = 1,
        limit: number = 30,
        signal?: AbortSignal,
    ): Promise<PaginatedResponse<string>> {
        const params = new URLSearchParams({
            page: String(page),
            limit: String(limit),
        })

        return apiGet(`/music/admin/posters?${params}`, {signal})
    },
}