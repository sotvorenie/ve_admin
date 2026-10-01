import {MusicListType} from "@/types/music.ts";

import {apiDelete, apiGet} from "@/api";

export const apiGetUserHistoryMusic = async (userId: number, page: number = 1, limit: number = 30, signal?: AbortSignal): Promise<MusicListType> => {
    return apiGet(`/history/all_from_user/${userId}?name=&page=${page}&limit=${limit}`, {signal})
}

export const apiDeleteMusicFromUserHistory = async (musicId: number, userId: number, signal?: AbortSignal): Promise<void> => {
    return apiDelete(`/history/admin/delete/${musicId}?user_id=${userId}`, {signal})
}
