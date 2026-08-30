import {MusicListType} from "@/types/music.ts";
import {SuccessResponseType} from "@/types/success.ts";

import {apiDelete, apiGet} from "@/api";

export const apiGetUserHistoryMusic = async (userId: number, page: number = 1, limit: number = 30, signal?: AbortSignal): Promise<MusicListType> => {
    return apiGet(`/history/all_from_user/${userId}?page=${page}&limit=${limit}`, undefined, signal)
}

export const apiDeleteMusicFromUserHistory = async (musicId: number, userId: number, signal?: AbortSignal): Promise<SuccessResponseType> => {
    return apiDelete(`/history/delete/${musicId}?user_id=${userId}`, undefined, signal)
}
