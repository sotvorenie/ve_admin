import {PaginatedResponse} from "@/types/response.ts";
import {TrackPreview} from "@/types/music.ts";
import {apiDelete, apiGet, apiPost} from "@/api";

export const VeMusicLikeService = {
    getLikedTracks(
        userId: number,
        page: number = 1,
        limit: number = 30,
        signal?: AbortSignal,
    ): Promise<PaginatedResponse<TrackPreview>> {
        const params = new URLSearchParams({
            page: String(page),
            limit: String(limit),
        })

        return apiGet(`/like/admin/all_from_user/${userId}?${params}`, {signal})
    },

    like(
        musicId: number,
        userId: number,
        signal?: AbortSignal,
    ): Promise<void> {
        const params = new URLSearchParams({
            user_id: String(userId),
        })

        return apiPost(`/like/admin/add/${musicId}?${params}`, undefined, {signal})
    },

    delete(
        musicId: number,
        userId: number,
        signal?: AbortSignal,
    ): Promise<void> {
        const params = new URLSearchParams({
            user_id: String(userId),
        })

        return apiDelete(`/like/admin/delete/${musicId}?${params}`, {signal})
    },
}