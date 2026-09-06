import {MusicListType} from "@/types/music.ts";

import {apiDelete, apiGet, apiPost} from "@/api";

export const apiGetUserLikeMusic = async (userId: number, page: number = 1, limit: number = 30, signal?: AbortSignal): Promise<MusicListType> => {
    return apiGet(`/like/all_from_user/${userId}?page=${page}&limit=${limit}`, {signal})
}

export const apiAddMusicToUserLike = async (musicId: number, userId: number, signal?: AbortSignal): Promise<void> => {
    return apiPost(`/like/add/${musicId}?user_id=${userId}`, undefined, {signal})
}

export const apiDeleteMusicFromUserLike = async (musicId: number, userId: number, signal?: AbortSignal): Promise<void> => {
    return apiDelete(`/like/delete/${musicId}?user_id=${userId}`, {signal})
}
