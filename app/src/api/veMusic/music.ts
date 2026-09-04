import {MusicForListType, MusicListType} from "@/types/music.ts";
import {SuccessResponseType} from "@/types/success.ts";

import {apiDelete, apiGet, apiPatch, apiPost} from "@/api";

export const apiGetAllMusic = async (
    name: string = '',
    genreId: number = -1,
    artistId: number = -1,
    page: number = 1,
    limit: number = 30,
    signal?: AbortSignal
): Promise<MusicListType> => {
    return apiGet(`/music/list?page=${page}&limit=${limit}&name=${name}&genre_id=${genreId}&artist_id=${artistId}&is_admin=true`, undefined, signal)
}

export const apiGetMusic = async (id: number, signal?: AbortSignal): Promise<MusicForListType> => {
    return apiGet(`/music/${id}`, undefined, signal)
}

export const apiRedactMusic = async (id: number, title: string, genreId: number, artists: number[], signal?: AbortSignal): Promise<SuccessResponseType> => {
    return apiPatch(`/music/redact/${id}`, {
        title,
        genre_id: genreId,
        artists,
    }, signal)
}

export const apiRedactAudioUrlForMusic = async (id: number, audioUrl: string, signal?: AbortSignal): Promise<SuccessResponseType> => {
    return apiPost(`/music/redact_audio_url/${id}`, {url: audioUrl}, signal)
}

export const apiRedactPreviewUrlForMusic = async (id: number, audioUrl: string, signal?: AbortSignal): Promise<SuccessResponseType> => {
    return apiPost(`/music/redact_preview_url/${id}`, {url: audioUrl}, signal)
}

export const apiRedactVideoUrlForMusic = async (id: number, audioUrl: string, signal?: AbortSignal): Promise<SuccessResponseType> => {
    return apiPost(`/music/redact_video_url/${id}`, {url: audioUrl}, signal)
}

export const apiRedactAuditionsForMusic = async (id: number, auditionsCount: number, signal?: AbortSignal): Promise<SuccessResponseType> => {
    return apiPatch(`/music/redact_auditions/${id}`, {auditions_count: auditionsCount}, signal)
}

export const apiDeleteMusic = async (id: number, signal?: AbortSignal): Promise<SuccessResponseType> => {
    return apiDelete(`/music/delete/${id}`, undefined, signal)
}

export const apiDeleteMusicPreview = async (id: number, signal?: AbortSignal): Promise<SuccessResponseType> => {
    return apiPatch(`/music/delete_preview/${id}`, undefined, signal)
}

export const apiDeleteMusicVideo = async (id: number, signal?: AbortSignal): Promise<SuccessResponseType> => {
    return apiPatch(`/music/delete_video/${id}`, undefined, signal)
}
