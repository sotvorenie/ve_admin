import {PaginatedResponse} from "@/types/response.ts";
import {TrackPreview} from "@/types/music.ts";

import {apiDelete, apiGet} from "@/api";

export const VeMusicHistoryService = {
    getHistoryMusic(
        userId: number,
        page: number = 1,
        limit: number = 30,
        signal?: AbortSignal,
    ): Promise<PaginatedResponse<TrackPreview>> {
        const params = new URLSearchParams({
            page: String(page),
            limit: String(limit),
        })

        return apiGet(`/history/admin/${userId}?${params}`, {signal})
    },

    delete(
        musicId: number,
        _: any,
        signal?: AbortSignal,
    ): Promise<void> {
        return apiDelete(`/history/admin/${musicId}`, {signal})
    },
}