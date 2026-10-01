import {MusicListType, MusicType} from "@/types/music.ts";
import {UrlType} from "@/types/url.ts";
import {PostersResponse} from "@/types/posters.ts";

import {apiDelete, apiGet, apiPatch, apiPost} from "@/api";

export const apiGetAllMusic = async (
    name: string = '',
    genreId: number = -1,
    artistId: number = -1,
    page: number = 1,
    limit: number = 30,
    signal?: AbortSignal
): Promise<MusicListType> => {
    return apiGet(`/music/list?page=${page}&limit=${limit}&name=${name}&genre_id=${genreId}&artist_id=${artistId}&is_admin=true`, {signal})
}

export const apiGetMusic = async (id: number, signal?: AbortSignal): Promise<MusicType> => {
    return apiGet(`/music/${id}?is_admin=true`, {signal})
}

export const apiRedactMusic = async (id: number, title: string, genreId: number, artists: number[], signal?: AbortSignal): Promise<void> => {
    return apiPatch(`/music/admin/redact/${id}`, {
        title,
        genre_id: String(genreId),
        artists: artists.join(','),
    }, {signal})
}

export const apiRedactAudioUrlForMusic = async (id: number, audioPath: string, signal?: AbortSignal): Promise<UrlType> => {
    return apiPost(`/music/admin/redact_audio_url/${id}`, {path: audioPath}, {signal})
}

export const apiRedactPreviewUrlForMusic = async (id: number, audioPath: string, signal?: AbortSignal): Promise<UrlType> => {
    return apiPatch(`/music/admin/redact_preview_url/${id}`, {path: audioPath}, {signal})
}

export const apiRedactVideoUrlForMusic = async (id: number, audioPath: string, signal?: AbortSignal): Promise<UrlType> => {
    return apiPatch(`/music/admin/redact_video_url/${id}`, {path: audioPath}, {signal})
}

export const apiRedactAuditionsForMusic = async (id: number, auditionsCount: number, signal?: AbortSignal): Promise<void> => {
    return apiPatch(`/music/admin/redact_auditions/${id}`, {auditions_count: auditionsCount}, {signal})
}

export const apiDeleteMusic = async (id: number, signal?: AbortSignal): Promise<void> => {
    return apiDelete(`/music/admin/delete/${id}`, {signal})
}

export const apiDeleteMusicPreview = async (id: number, signal?: AbortSignal): Promise<void> => {
    return apiPatch(`/music/admin/delete_preview/${id}`, undefined, {signal})
}

export const apiDeleteMusicVideo = async (id: number, signal?: AbortSignal): Promise<void> => {
    return apiPatch(`/music/admin/delete_video/${id}`, undefined, {signal})
}

export const apiGetMusicPosters = async (signal?: AbortSignal): Promise<PostersResponse> => {
    return apiGet('/music/admin/get_posters', {signal})
}
