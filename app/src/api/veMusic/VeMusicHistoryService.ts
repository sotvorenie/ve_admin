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

        return apiGet(`/history/admin/all_from_user/${userId}?${params}`, {signal})
    },

    delete(
        musicId: number,
        userId: number,
        signal?: AbortSignal,
    ): Promise<void> {
        const params = new URLSearchParams({
            user_id: String(userId),
        })

        return apiDelete(`/history/admin/delete/${musicId}?${params}`, {signal})
    },
}