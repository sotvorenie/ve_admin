import {ListResponse} from "@/types/response.ts";
import {Search, SearchType} from "@/types/search.ts";

import {apiDelete, apiGet, apiPost} from "@/api";

export const VeMusicSearchService = {
    getList(
        userId: number,
        signal?: AbortSignal,
    ): Promise<ListResponse<Search>> {
        return apiGet(`/search/admin/${userId}`, {signal})
    },

    create(
        userId: number,
        search: string,
        type: SearchType,
        signal?: AbortSignal,
    ): Promise<Search> {
        const payload = {
            search,
            type,
        }

        return apiPost(`/search/admin/${userId}`, payload, {signal})
    },

    delete(
        id: number,
        userId: number,
        signal?: AbortSignal,
    ): Promise<void> {
        const params = new URLSearchParams({
            user_id: String(userId),
        })

        return apiDelete(`/search/admin/${id}?${params}`, {signal})
    },
}