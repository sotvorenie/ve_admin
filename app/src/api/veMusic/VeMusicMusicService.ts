import {ListResponse, PaginatedResponse} from "@/types/response.ts";
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

        return apiGet(`/music/list?${params}`, {signal})
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
        title: string,
        genreId: number,
        artists: number[],
        signal?: AbortSignal,
    ) {
        const payload = {
            title,
            genre_id: String(genreId),
            artists: artists.join(','),
        }

        return apiPatch(`/music/admin/update/${id}`, payload, {signal})
    },

    updatePreviewPath(
        id: number,
        path: string,
        signal?: AbortSignal,
    ): Promise<Url> {
        const payload = {
            path,
        }

        return apiPatch(`/music/admin/update_preview_path/${id}`, payload, {signal})
    },

    updatePreviewUrl(
        id: number,
        url: string,
        signal?: AbortSignal,
    ): Promise<Url> {
        const payload = {
            url,
        }

        return apiPatch(`/music/admin/update_preview_url/${id}`, payload, {signal})
    },

    updateVideoPath(
        id: number,
        path: string,
        signal?: AbortSignal,
    ): Promise<Url> {
        const payload = {
            path,
        }

        return apiPatch(`/music/admin/update_video_path/${id}`, payload, {signal})
    },

    updateAuditions(
        id: number,
        auditionsCount: number,
        signal?: AbortSignal,
    ): Promise<void> {
        const payload = {
            auditions_count: auditionsCount
        }

        return apiPatch(`/music/admin/update_auditions/${id}`, payload, {signal})
    },

    delete(
        id: number,
        signal?: AbortSignal,
    ): Promise<void> {
        return apiDelete(`/music/admin/delete/${id}`, {signal})
    },

    deletePreview(
        id: number,
        signal?: AbortSignal,
    ): Promise<void> {
        return apiPatch(`/music/admin/delete_preview/${id}`, undefined, {signal})
    },

    deleteVideo(
        id: number,
        signal?: AbortSignal,
    ): Promise<void> {
        return apiPatch(`/music/admin/delete_video/${id}`, undefined, {signal})
    },

    getPosters(
        signal?: AbortSignal,
    ): Promise<ListResponse<string>> {
        return apiGet('/music/admin/get_posters', {signal})
    },
}