import {ListResponse} from "@/types/response.ts";
import {Search} from "@/types/search.ts";

import {apiDelete, apiGet, apiPost} from "@/api";

export const VeMusicSearchService = {
    getList(
        userId: number,
        signal?: AbortSignal,
    ): Promise<ListResponse<Search>> {
        return apiGet(`/search/admin/all_from_user/${userId}`, {signal})
    },

    create(
        userId: number,
        search: string,
        signal?: AbortSignal,
    ): Promise<Search> {
        const payload = {
            search,
        }

        return apiPost(`/search/admin/set_for_user/${userId}`, payload, {signal})
    },

    delete(
        id: number,
        userId: number,
        signal?: AbortSignal,
    ): Promise<void> {
        const params = new URLSearchParams({
            user_id: String(userId),
        })

        return apiDelete(`/search/admin/delete_from_user/${id}?${params}`, {signal})
    },
}