import {AppUsersResponse, AppUserType} from "@/types/user.ts";

import {apiGet} from "@api/index.ts";

export const getAllUsers = async (page: number = 1, limit: number = 30, signal?: AbortSignal): Promise<AppUsersResponse> => {
    return apiGet(`/user/all?page=${page}&limit=${limit}`, undefined, signal)
}

export const getUser = async (id: number, signal?: AbortSignal): Promise<AppUserType> => {
    return apiGet(`/user/${id}`,undefined, signal)
}